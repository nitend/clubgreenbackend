import {Resolver, Query, Mutation, Arg, Ctx, UseMiddleware} from 'type-graphql'
import { User } from '../entity/User';
import {hash, compare} from 'bcryptjs'
import {MyContext} from '../usermanagement/MyContext'
import { createRefreshToken, createAccessToken } from '../usermanagement/auth';
import { isAuth } from '../usermanagement/isAuthMiddleware';
import { verify } from 'jsonwebtoken';
import { sendRefreshToken } from '../usermanagement/sendRefreshToken';
import {sendVerification} from '../emailverification/emailverification'
import { createCustomer } from '../payment/PaymentService';
import { Users } from '../database';
import { LoginResponse, UserName, UserAddress } from './ObjectTypes';



@Resolver()
export class UserResolver {

    db = Users;

    @Query(() => User, {nullable: true})
    @UseMiddleware(isAuth)
    async me(@Ctx() context: MyContext) {
        
        const authorization = context.req.headers['authorization'];

        if(!authorization){
            console.log('no auth header')
            return null;           
        }  
        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);    
            return await this.db.findById(payload.userId);
        
        } catch (err) {
            console.log('err')
            return null;
        }
    }
    
    @Query(() => [User]) 
    async users() {
        return await this.db.getAll()
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() {res}: MyContext) {
        sendRefreshToken(res, "");
        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokeForUser(@Arg("userId") userId: string){
        const user = await this.db.findById(userId);
        user.tokenVersion = user.tokenVersion+1
        return await this.db.replace(user);
    }

    @UseMiddleware(isAuth) 
    @Mutation(() => Boolean)
    async createPaymentServiceCustomer(
        @Ctx() context: MyContext){    
    
        const userId = context.payload?.userId;
        const user = await this.db.findById(userId ? userId : "");
        if(user){
            const customerId = await createCustomer(user.email, user.id);
            if(customerId){
                user.paymentServiceId = customerId;
                await this.db.replace(user);
            }
        }
        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() {res}: MyContext
        ): Promise<LoginResponse> {

        const userlist: User[] | undefined = await this.db.findByPropValue("email", email)
        const user = userlist[0];
        
        if(!user){
            throw new Error("could not find user");
        }

        const valid = await compare(password, user.password);
        
        if(!valid){
            throw new Error("password not valid");
        }

        // login successfully
        res.cookie('jid', 
            createRefreshToken(user), 
            {httpOnly: true})

        return {
            accessToken: createAccessToken(user),
            user
        }; 
    }
    

    // 
    // Register
    //
    @Mutation(() => Boolean)
    async register(
        @Arg('username') username: string,
        @Arg('email') email: string,
        @Arg('password') password: string       
        ){
        
        const user = await this.db.findByPropValue("email", email);
        if(user.length == 0){
            const hashedPassword = await hash(password, 12)      
            try{
                sendVerification(email)
                const user = new User();
                user.username = username;
                user.email = email;
                user.password = hashedPassword;
                await this.db.insert(user);  
            } catch(err) {
                console.log(err)
                return false;
            }
        } else {
            return false;
        }
        return true; 
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateUserName(
        @Ctx() context: MyContext,
        @Arg('username') username: UserName){
        const userId = context.payload?.userId;
        try{
            const currentUser = await this.db.findById(userId ? userId : "")
            if(currentUser){

                if(username){
                    currentUser.surname = username.surname;
                    currentUser.firstname = username.firstName;
                    currentUser.gender = username.gender;
                }
                const saved = await this.db.replace(currentUser);
                if(saved){
                    return true;
                }
            }
    
        } catch(err) {
            console.log(err)
            return false;
        }
       
        return true; 
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateUserAddress(
        @Ctx() context: MyContext,
        @Arg('useraddress') useraddress: UserAddress,
        ){
   
        const userId = context.payload?.userId;
        try{
            const currentUser = await this.db.findById(userId ? userId : "")
            if(currentUser){
                if(useraddress){
                    currentUser.street = useraddress.streetName;
                    currentUser.streetNumber = useraddress.streetNumber;
                    currentUser.postalcode = useraddress.postalCode;
                    currentUser.town = useraddress.town;
                }
                const saved = await this.db.replace(currentUser);
                if(saved){
                    return true;
                }
            }
    
        } catch(err) {
            console.log(err)
            return false;
        }
       
        return true; 
    }


}




