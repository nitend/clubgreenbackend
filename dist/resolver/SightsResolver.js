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
const Sight_1 = require("../entity/Sight");
let SightResolver = class SightResolver {
    constructor() {
        this.db = database_1.Sights;
    }
    getSight(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.findById(id);
        });
    }
    getNewSight() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.insert(new Sight_1.Sight());
        });
    }
    getAllSights() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.getAll();
        });
    }
    updateSight(sight) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.replace(sight);
        });
    }
    deleteSight(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.delete(id);
        });
    }
    insertSight(sight) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.insert(sight);
        });
    }
};
__decorate([
    type_graphql_1.Query(() => Sight_1.Sight, { nullable: true }),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SightResolver.prototype, "getSight", null);
__decorate([
    type_graphql_1.Query(() => Sight_1.Sight),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SightResolver.prototype, "getNewSight", null);
__decorate([
    type_graphql_1.Query(() => [Sight_1.Sight], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SightResolver.prototype, "getAllSights", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __param(0, type_graphql_1.Arg("sight")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Sight_1.Sight]),
    __metadata("design:returntype", Promise)
], SightResolver.prototype, "updateSight", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SightResolver.prototype, "deleteSight", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    type_graphql_1.UseMiddleware(isAuthMiddleware_1.isAuth),
    __param(0, type_graphql_1.Arg("sight")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Sight_1.Sight]),
    __metadata("design:returntype", Promise)
], SightResolver.prototype, "insertSight", null);
SightResolver = __decorate([
    type_graphql_1.Resolver()
], SightResolver);
exports.SightResolver = SightResolver;
//# sourceMappingURL=SightsResolver.js.map