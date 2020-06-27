"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const isAuthMiddleware_1 = require("../usermanagement/isAuthMiddleware");
const PaymentService_1 = require("./PaymentService");
const database_1 = require("../database");
let PaymentResolver = class PaymentResolver {
    constructor() {
        this.db = database_1.Users;
    }
    subscribeToPricePlan({ payload }, priceplan) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.findByPropValue("id", ((_a = payload) === null || _a === void 0 ? void 0 : _a.userId) ? (_b = payload) === null || _b === void 0 ? void 0 : _b.userId : "");
            const user = result[0];
            if (priceplan && user && user.paymentServiceId) {
                PaymentService_1.subscripeToPricePlan(priceplan, user.paymentServiceId);
            }
            return true;
        });
    }
    addPaymentMethod({ payload }, paymentMethodId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.findByPropValue("id", ((_a = payload) === null || _a === void 0 ? void 0 : _a.userId) ? payload.userId : "");
            const user = result[0];
            if (paymentMethodId && user && user.paymentServiceId) {
                PaymentService_1.addPaymentMothodToCostumer(paymentMethodId, user.paymentServiceId);
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("priceplan")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "subscribeToPricePlan", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("paymentMethodId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "addPaymentMethod", null);
PaymentResolver = __decorate([
    type_graphql_1.Resolver()
], PaymentResolver);
exports.PaymentResolver = PaymentResolver;
//# sourceMappingURL=PaymentResolver.js.map