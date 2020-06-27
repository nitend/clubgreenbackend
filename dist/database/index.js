"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CosmosDBConnect_1 = require("./CosmosDBConnect");
const Products = new CosmosDBConnect_1.DataItem("products");
exports.Products = Products;
const Users = new CosmosDBConnect_1.DataItem("users");
exports.Users = Users;
const Properties = new CosmosDBConnect_1.DataItem("properties");
exports.Properties = Properties;
const Bookings = new CosmosDBConnect_1.DataItem("bookings");
exports.Bookings = Bookings;
const Sights = new CosmosDBConnect_1.DataItem("sights");
exports.Sights = Sights;
const Ratings = new CosmosDBConnect_1.DataItem("ratings");
exports.Ratings = Ratings;
const Emails = new CosmosDBConnect_1.DataItem("emails");
exports.Emails = Emails;
//# sourceMappingURL=index.js.map