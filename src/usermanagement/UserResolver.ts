import {Resolver, Query, Mutation, Arg, ObjectType, Field, Ctx, UseMiddleware, Int, InputType} from 'type-graphql'
import { User } from './entity/User';
import {hash, compare} from 'bcryptjs'
import {MyContext} from './MyContext'
import { createRefreshToken, createAccessToken } from './auth';
import { isAuth } from './isAuthMiddleware';
import { verify } from 'jsonwebtoken';
import { sendRefreshToken } from './sendRefreshToken';
import { getConnection } from 'typeorm';
import {sendVerification} from './emailverification/emailverification'
import { createCustomer } from '../payment/PaymentService';
import { logger } from '../logger/Logger';



@ObjectType()
class LoginResponse{

    @Field()
    accessToken: string

    @Field(() => User)
    user: User;
}

@InputType()
class UserAddress{

    @Field()
    streetName: string

    @Field()
    streetNumber: string;

    @Field()
    postalCode: string

    @Field()
    town: string;
}

@InputType()
class UserName{

    @Field()
    gender: string;

    @Field()
    firstName: string

    @Field()
    surname: string;
}




@Resolver()
export class UserResolver {

    @Query(() => User, {nullable: true})
    @UseMiddleware(isAuth)
    me(@Ctx() context: MyContext) {
        
        const authorization = context.req.headers['authorization'];

        if(!authorization){
            console.log('no auth header')
            return null;           
        }
    
        try {
            const token = authorization.split(" ")[1];
            const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);    
            return User.findOne(payload.userId);
            
        } catch (err) {
            console.log('err')
            return null;
        }
        return null;
    }
    
    @Query(() => [User]) 
    users() {
        return User.find();
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() {res}: MyContext) {
        sendRefreshToken(res, "");
        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokeForUser(@Arg("userId", () => Int) userId: string){
        await getConnection()
            .getRepository(User)
            .increment({id: userId}, "tokenVersion", 1);
        return true;
    }
    @UseMiddleware(isAuth) 
    @Mutation(() => Boolean)
    async createPaymentServiceCustomer(
        @Ctx() context: MyContext){    
        var userId: string|undefined  = undefined;

        if(context && context.payload){
            userId = context.payload.userId;
        } else {
            throw new Error('no userId')
        }
        const user = await User.findOne({id: userId})
        if(user){
            const customerId = await createCustomer(user.email, user.id);
            if(customerId){
                user.paymentServiceId = customerId;
                await User.save(user);
                logger.info('payment customer successfully created for user: '+ user.id)
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

        const user: User | undefined = await User.findOne({where: {email}})
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
        
        // const user = await User.findOne({where: {email}})
        if(true){ // !! rausnehmen
            const hashedPassword = await hash(password, 12)      
            try{
                sendVerification(email)
                await User.insert({
                    username: username,
                    email: email,
                    password: hashedPassword,     
                })  
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
        try{
            const currentUser = await User.findOne({id: context.payload?.userId})
            if(currentUser){

                if(username){
                    currentUser.surname = username.surname;
                    currentUser.firstname = username.firstName;
                    currentUser.gender = username.gender;
                }
                const saved = await User.save(currentUser);
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
    
        try{
            const currentUser = await User.findOne({id: context.payload?.userId})
            if(currentUser){
                if(useraddress){
                    currentUser.street = useraddress.streetName;
                    currentUser.streetNumber = useraddress.streetNumber;
                    currentUser.postalcode = useraddress.postalCode;
                    currentUser.town = useraddress.town;
                }
                const saved = await User.save(currentUser);
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

