"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentService_1 = require("./PaymentService");
test('payment create customer', () => {
    return PaymentService_1.createCustomer('sven@d-nite.de', "uuid_1111111111").then(data => {
        expect(data).toBeDefined();
    });
});
//# sourceMappingURL=payment.test.js.map