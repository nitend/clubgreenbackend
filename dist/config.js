"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMAGE_BASE_DIR = "public/images/";
exports.IMAGE_UPLOAD_BASE_URL = "properties/";
exports.dbConfig = {
    endpoint: process.env.COSMOS_DB_URL ? process.env.COSMOS_DB_URL : "no endpoint found",
    key: process.env.COSMOS_DB_SECRET_KEY ? process.env.COSMOS_DB_SECRET_KEY : "no key found",
    databaseId: "clubgreenDb",
    partitionKey: { kind: "Hash", paths: ["/products"] }
};
//# sourceMappingURL=config.js.map