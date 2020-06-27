"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const Logger_1 = require("../logger/Logger");
const apikey = process.env.PAYMENT_API_KEY ? process.env.PAYMENT_API_KEY : "";
const stripe = new stripe_1.default(apikey, {
    apiVersion: '2020-03-02'
});
exports.createCustomer = (email, userid) => __awaiter(void 0, void 0, void 0, function* () {
    const param = {
        description: 'user: ' + userid,
        email: email
    };
    var customer = undefined;
    try {
        customer = yield stripe.customers.create(param);
    }
    catch (error) {
        Logger_1.logger.error(error);
        throw error;
    }
    if (customer) {
        Logger_1.logger.info('customer created', customer.id);
        return customer.id;
    }
    return undefined;
});
exports.addPaymentMothodToCostumer = (paymentMethodId, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
    }
    catch (error) {
        Logger_1.logger.error(error);
        throw error;
    }
});
exports.subscripeToPricePlan = (priceplan, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield stripe.subscriptions.create({
            customer: customerId,
            items: [
                {
                    price: priceplan
                }
            ]
        });
    }
    catch (error) {
        Logger_1.logger.error(error);
        throw error;
    }
});
exports.getAllSubscriptions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield stripe.subscriptions.list();
    }
    catch (error) {
        Logger_1.logger.error(error);
        throw error;
    }
});
exports.getSubscriptionForCustomer = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (customerId) {
            const error = new Error('no customerId');
            Logger_1.logger.error(error);
            throw error;
        }
        return yield stripe.subscriptions.retrieve(customerId);
    }
    catch (error) {
        Logger_1.logger.error(error);
        throw error;
    }
});
exports.cancleSubscription = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (customerId) {
            const error = new Error('no customerId');
            Logger_1.logger.error(error);
            throw error;
        }
        return yield stripe.subscriptions.del(customerId);
    }
    catch (error) {
        Logger_1.logger.error(error);
        throw error;
    }
});
exports.getPricePlans = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield stripe.prices.list();
    }
    catch (error) {
        console.log(error);
        Logger_1.logger.error(error);
        throw error;
    }
});
exports.changePaymentMethod = () => {
};
//# sourceMappingURL=PaymentService.js.map