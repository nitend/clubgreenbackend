import {Resolver, Mutation, Arg, UseMiddleware, Ctx} from 'type-graphql'
import { isAuth } from '../usermanagement/isAuthMiddleware';
import { subscripeToPricePlan, addPaymentMothodToCostumer } from './PaymentService';
import { MyContext } from 'src/usermanagement/MyContext';
import { Users } from '../database';


@Resolver()
export class PaymentResolver {

    db = Users;

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async subscribeToPricePlan(
        @Ctx() { payload }: MyContext,
        @Arg("priceplan") priceplan: string){  
            
        const result = await this.db.findByPropValue("id", payload?.userId ? payload?.userId : "");
        const user = result[0];
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
            
        const result = await this.db.findByPropValue("id", payload?.userId ? payload.userId : "");
        const user = result[0];
        if(paymentMethodId && user && user.paymentServiceId){
            addPaymentMothodToCostumer(paymentMethodId, user.paymentServiceId);
        }      
        return true      
    }
}

