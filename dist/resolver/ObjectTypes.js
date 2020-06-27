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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entity/User");
let BlockedDate = class BlockedDate {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BlockedDate.prototype, "bookingId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BlockedDate.prototype, "dateTimeStamp", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BlockedDate.prototype, "type", void 0);
BlockedDate = __decorate([
    type_graphql_1.ObjectType()
], BlockedDate);
exports.BlockedDate = BlockedDate;
let RatingValues = class RatingValues {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], RatingValues.prototype, "targettype", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RatingValues.prototype, "targetId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RatingValues.prototype, "ratings", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], RatingValues.prototype, "ratingValue", void 0);
RatingValues = __decorate([
    type_graphql_1.ObjectType()
], RatingValues);
exports.RatingValues = RatingValues;
let LoginResponse = class LoginResponse {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginResponse.prototype, "accessToken", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    __metadata("design:type", User_1.User)
], LoginResponse.prototype, "user", void 0);
LoginResponse = __decorate([
    type_graphql_1.ObjectType()
], LoginResponse);
exports.LoginResponse = LoginResponse;
let UserAddress = class UserAddress {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserAddress.prototype, "streetName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserAddress.prototype, "streetNumber", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserAddress.prototype, "postalCode", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserAddress.prototype, "town", void 0);
UserAddress = __decorate([
    type_graphql_1.InputType()
], UserAddress);
exports.UserAddress = UserAddress;
let UserName = class UserName {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserName.prototype, "gender", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserName.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UserName.prototype, "surname", void 0);
UserName = __decorate([
    type_graphql_1.InputType()
], UserName);
exports.UserName = UserName;
//# sourceMappingURL=ObjectTypes.js.map