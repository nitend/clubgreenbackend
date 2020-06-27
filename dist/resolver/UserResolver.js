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
const User_1 = require("../entity/User");
const bcryptjs_1 = require("bcryptjs");
const auth_1 = require("../usermanagement/auth");
const isAuthMiddleware_1 = require("../usermanagement/isAuthMiddleware");
const jsonwebtoken_1 = require("jsonwebtoken");
const sendRefreshToken_1 = require("../usermanagement/sendRefreshToken");
const emailverification_1 = require("../emailverification/emailverification");
const PaymentService_1 = require("../payment/PaymentService");
const database_1 = require("../database");
const ObjectTypes_1 = require("./ObjectTypes");
let UserResolver = class UserResolver {
    constructor() {
        this.db = database_1.Users;
    }
    me(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = context.req.headers['authorization'];
            if (!authorization) {
                console.log('no auth header');
                return null;
            }
            try {
                const token = authorization.split(" ")[1];
                const payload = jsonwebtoken_1.verify(token, process.env.ACCESS_TOKEN_SECRET);
                return yield this.db.findById(payload.userId);
            }
            catch (err) {
                console.log('err');
                return null;
            }
        });
    }
    users() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getAll();
        });
    }
    logout({ res }) {
        return __awaiter(this, void 0, void 0, function* () {
            sendRefreshToken_1.sendRefreshToken(res, "");
            return true;
        });
    }
    revokeRefreshTokeForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.findById(userId);
            user.tokenVersion = user.tokenVersion + 1;
            return yield this.db.replace(user);
        });
    }
    createPaymentServiceCustomer(context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = context.payload) === null || _a === void 0 ? void 0 : _a.userId;
            const user = yield this.db.findById(userId ? userId : "");
            if (user) {
                const customerId = yield PaymentService_1.createCustomer(user.email, user.id);
                if (customerId) {
                    user.paymentServiceId = customerId;
                    yield this.db.replace(user);
                }
            }
            return true;
        });
    }
    login(email, password, { res }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userlist = yield this.db.findByPropValue("email", email);
            const user = userlist[0];
            if (!user) {
                throw new Error("could not find user");
            }
            const valid = yield bcryptjs_1.compare(password, user.password);
            if (!valid) {
                throw new Error("password not valid");
            }
            res.cookie('jid', auth_1.createRefreshToken(user), { httpOnly: true });
            return {
                accessToken: auth_1.createAccessToken(user),
                user
            };
        });
    }
    register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.findByPropValue("email", email);
            if (user.length == 0) {
                const hashedPassword = yield bcryptjs_1.hash(password, 12);
                try {
                    emailverification_1.sendVerification(email);
                    const user = new User_1.User();
                    user.username = username;
                    user.email = email;
                    user.password = hashedPassword;
                    yield this.db.insert(user);
                }
                catch (err) {
                    console.log(err);
                    return false;
                }
            }
            else {
                return false;
            }
            return true;
        });
    }
    updateUserName(context, username) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = context.payload) === null || _a === void 0 ? void 0 : _a.userId;
            try {
                const currentUser = yield this.db.findById(userId ? userId : "");
                if (currentUser) {
                    if (username) {
                        currentUser.surname = username.surname;
                        currentUser.firstname = username.firstName;
                        currentUser.gender = username.gender;
                    }
                    const saved = yield this.db.replace(currentUser);
                    if (saved) {
                        return true;
                    }
                }
            }
            catch (err) {
                console.log(err);
                return false;
            }
            return true;
        });
    }
    updateUserAddress(context, useraddress) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userId = (_a = context.payload) === null || _a === void 0 ? void 0 : _a.userId;
            try {
                const currentUser = yield this.db.findById(userId ? userId : "");
                if (currentUser) {
                    if (useraddress) {
                        currentUser.street = useraddress.streetName;
                        currentUser.streetNumber = useraddress.streetNumber;
                        currentUser.postalcode = useraddress.postalCode;
                        currentUser.town = useraddress.town;
                    }
                    const saved = yield this.db.replace(currentUser);
                    if (saved) {
                        return true;
                    }
                }
            }
            catch (err) {
                console.log(err);
                return false;
            }
            return true;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.Query(() => [User_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "revokeRefreshTokeForUser", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createPaymentServiceCustomer", null);
__decorate([
    type_graphql_1.Mutation(() => ObjectTypes_1.LoginResponse),
    __param(0, type_graphql_1.Arg('email')),
    __param(1, type_graphql_1.Arg('password')),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('username')),
    __param(1, type_graphql_1.Arg('email')),
    __param(2, type_graphql_1.Arg('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ObjectTypes_1.UserName]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUserName", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('useraddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ObjectTypes_1.UserAddress]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUserAddress", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map