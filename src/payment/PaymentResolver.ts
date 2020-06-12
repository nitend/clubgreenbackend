import {Resolver, Mutation, Arg, UseMiddleware, Ctx} from 'type-graphql'
import { isAuth } from '../usermanagement/isAuthMiddleware';
import { subscripeToPricePlan, addPaymentMothodToCostumer } from './PaymentService';
import { MyContext } from 'src/usermanagement/MyContext';
import { User } from '../usermanagement/entity/User';


@Resolver()
export class PaymentResolver {


    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async subscribeToPricePlan(
        @Ctx() { payload }: MyContext,
        @Arg("priceplan") priceplan: string){  
            
        const user = await User.findOne({id: payload?.userId});
        if(priceplan && user && user.paymentServiceId){
            subscripeToPricePlan(priceplan, user.paymentServiceId);
        }       
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async addPaymentMethod(
        @Ctx() { payload }: MyContext,
        @Arg("paymentMethodId") paymentMethodId: string){ 
            
        const user = await User.findOne({id: payload?.userId});
        if(paymentMethodId && user && user.paymentServiceId){
            addPaymentMothodToCostumer(paymentMethodId, user.paymentServiceId);
        }      
        return true      
    }
}

