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
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const usermanager_1 = require("./usermanagement/usermanager");
const cors_1 = __importDefault(require("cors"));
const imageUploader_1 = require("./imageHandling/imageUploader");
const UploadNodes_1 = require("./imageHandling/UploadNodes");
const ProductResolver_1 = require("./resolver/ProductResolver");
const PaymentResolver_1 = require("./payment/PaymentResolver");
const RatingResolver_1 = require("./resolver/RatingResolver");
const SightsResolver_1 = require("./resolver/SightsResolver");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const BookingResolver_1 = require("./resolver/BookingResolver");
const PropertyResolver_1 = require("./resolver/PropertyResolver");
const UserResolver_1 = require("./resolver/UserResolver");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express_1.default();
    app.use(cookie_parser_1.default());
    app.use(cors_1.default({
        origin: process.env.CORS_DOMAIN_ALLOWED,
        credentials: true
    }));
    app.use(express_1.default.static('public'));
    usermanager_1.usermanager(app);
    app.post('/upload/property/image');
    imageUploader_1.imgUpload(app, UploadNodes_1.getNodes());
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [
                UserResolver_1.UserResolver,
                BookingResolver_1.BookingResolver,
                PropertyResolver_1.PropertyResolver,
                RatingResolver_1.RatingResolver,
                SightsResolver_1.SightResolver,
                ProductResolver_1.ProductResolver,
                PaymentResolver_1.PaymentResolver
            ]
        }),
        context: ({ req, res }) => ({ req, res })
    });
    apolloServer.applyMiddleware({ app, cors: false });
    const port = process.env.PORT || 80;
    app.listen(port, () => {
        console.log('Server is listening on Port ' + port);
    });
}))();
//# sourceMappingURL=index.js.map