import { createCustomer } from "./PaymentService"

test('payment create customer', () => {
    return createCustomer('sven@d-nite.de', "uuid_1111111111").then(data => {
      expect(data).toBeDefined();
    });
  });
  