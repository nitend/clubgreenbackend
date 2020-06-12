import Stripe from 'stripe'
import { logger } from '../logger/Logger';

const apikey: string = process.env.PAYMENT_API_KEY ? process.env.PAYMENT_API_KEY : "";

const stripe = new Stripe(apikey, {
    apiVersion: '2020-03-02'
})

export const createCustomer = async (email: string, userid: string) => {

    const param: Stripe.CustomerCreateParams  = {
        description: 'user: ' + userid,
        email: email        
    };

    var customer: Stripe.Customer | undefined = undefined;

    try{
        customer = await stripe.customers.create(param)
    } catch (error){
        logger.error(error)
        throw error;
    }

    if(customer){
        logger.info('customer created', customer.id)
        return customer.id;
    }
    return undefined;
}

export const addPaymentMothodToCostumer = async (paymentMethodId: string, customerId: string) => {
    try{
        return await stripe.paymentMethods.attach(
            paymentMethodId,
            {customer: customerId}
        )
    } catch (error){
        logger.error(error)
        throw error;      
    }
}

export const subscripeToPricePlan = async (priceplan: string, customerId: string) => {
    try {
        return await stripe.subscriptions.create({
            customer: customerId,
            items: [
                {
                    price: priceplan
                }
            ]
        })
    } catch (error){
        logger.error(error)
        throw error;      
    }
}

export const getAllSubscriptions = async () => {
    try {
        return await stripe.subscriptions.list()
        
    } catch (error){
        logger.error(error)
        throw error;      
    }
}

export const getSubscriptionForCustomer = async (customerId: string) => {
    try {
        if(customerId){
            const error = new Error('no customerId')
            logger.error(error)
            throw error;  
        }
        return await stripe.subscriptions.retrieve(customerId)
        
    } catch (error){
        logger.error(error)
        throw error;      
    }
}


export const cancleSubscription = async (customerId: string) => {
    try {
        if(customerId){
            const error = new Error('no customerId')
            logger.error(error)
            throw error;  
        }
        return await stripe.subscriptions.del(customerId)
        
    } catch (error){
        logger.error(error)
        throw error;      
    }
}

export const getPricePlans = async () => {
    try {
        return await stripe.prices.list()
        
    } catch (error){
        console.log(error)
        logger.error(error)
        throw error;      
    }
}

export const changePaymentMethod = () => {
    
}