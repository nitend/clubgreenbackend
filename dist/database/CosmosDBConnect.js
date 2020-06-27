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
Object.defineProperty(exports, "__esModule", { value: true });
const cosmos_1 = require("@azure/cosmos");
const UUIDGen_1 = require("./UUIDGen");
const config_1 = require("../config");
const client = new cosmos_1.CosmosClient({
    endpoint: config_1.dbConfig.endpoint,
    key: config_1.dbConfig.key
});
function create() {
    return __awaiter(this, void 0, void 0, function* () {
        const { database } = yield client.databases.createIfNotExists({ id: config_1.dbConfig.databaseId });
        return database;
    });
}
class DataItem {
    constructor(containerId) {
        this.containerId = "";
        this.querySpec = {
            query: "SELECT * from c"
        };
        this.containerId = containerId;
    }
    getContainer() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield create();
            const { container } = yield db.containers.createIfNotExists({ id: this.containerId });
            if (container) {
                return container;
            }
            else {
                throw new Error("");
            }
        });
    }
    insert(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = yield this.getContainer();
            item.id = UUIDGen_1.genUuid();
            item.creationDate = new Date(Date.now()).toDateString();
            return new Promise((resolve, reject) => {
                container.items.create(item).then(result => {
                    resolve(result.resource);
                }).catch((error) => {
                    reject(error);
                });
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const container = yield this.getContainer();
            return new Promise((resolve, reject) => {
                container.items.query(this.querySpec).fetchAll().then((data) => {
                    console.log(data.resources);
                    resolve(data.resources);
                }).catch(error => {
                    reject(error);
                });
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.findById(id);
            item.deleted = true;
            return this.replace(item);
        });
    }
    replace(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = yield this.getContainer();
            return new Promise((resolve, reject) => {
                container.item(item.id).replace(item).then((data) => {
                    if (data.resource) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }).catch(error => reject(error));
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const container = yield this.getContainer();
            return new Promise((resolve, reject) => {
                container.item(id).read()
                    .then(data => resolve(data.resource))
                    .catch(error => reject(error));
            });
        });
    }
    findByPropValue(property, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { query: "SELECT * from c WHERE " + property + " = '" + value + "'" };
            const container = yield this.getContainer();
            return new Promise((resolve, reject) => {
                container.items.query(query).fetchAll()
                    .then(data => resolve(data.resources))
                    .catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    }
}
exports.DataItem = DataItem;
//# sourceMappingURL=CosmosDBConnect.js.map