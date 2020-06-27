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
const database_1 = require("../database");
const Rating_1 = require("../entity/Rating");
const ObjectTypes_1 = require("./ObjectTypes");
let RatingResolver = class RatingResolver {
    constructor() {
        this.db = database_1.Ratings;
    }
    getRating(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.findById(id);
        });
    }
    getNewRating() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.insert(new Rating_1.Rating());
        });
    }
    getAllRatings() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getAll();
        });
    }
    updateRating(rating) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.replace(rating);
        });
    }
    deleteRating(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.delete(id);
        });
    }
    insertRating(rating) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.insert(rating);
        });
    }
    getRatingValuesByTarget(targetId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(targetId);
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Rating_1.Rating, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RatingResolver.prototype, "getRating", null);
__decorate([
    type_graphql_1.Query(() => Rating_1.Rating),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RatingResolver.prototype, "getNewRating", null);
__decorate([
    type_graphql_1.Query(() => [Rating_1.Rating], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RatingResolver.prototype, "getAllRatings", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __param(0, type_graphql_1.Arg("rating")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Rating_1.Rating]),
    __metadata("design:returntype", Promise)
], RatingResolver.prototype, "updateRating", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RatingResolver.prototype, "deleteRating", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __param(0, type_graphql_1.Arg("rating")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Rating_1.Rating]),
    __metadata("design:returntype", Promise)
], RatingResolver.prototype, "insertRating", null);
__decorate([
    type_graphql_1.Query(() => ObjectTypes_1.RatingValues, { nullable: true }),
    __param(0, type_graphql_1.Arg("targetId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RatingResolver.prototype, "getRatingValuesByTarget", null);
RatingResolver = __decorate([
    type_graphql_1.Resolver()
], RatingResolver);
exports.RatingResolver = RatingResolver;
//# sourceMappingURL=RatingResolver.js.map