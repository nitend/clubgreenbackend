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
const database_1 = require("../database");
exports.getNodes = () => {
    const nodes = [
        {
            imageUrl: "properties/",
            uploadUrl: "/upload/property/image",
            handleFileSaved: updatePropertyImageData
        },
        {
            imageUrl: "sights/",
            uploadUrl: "/upload/sight/image",
            handleFileSaved: updateSightImageData
        }
    ];
    return nodes;
};
const propDb = database_1.Properties;
const sightDb = database_1.Sights;
const updatePropertyImageData = (propId, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const prop = yield propDb.findByPropValue("id", propId);
    pushImageData(prop, imageUrl);
});
const updateSightImageData = (sightId, imageUrl) => __awaiter(void 0, void 0, void 0, function* () {
    const prop = yield sightDb.findByPropValue("id", sightId);
    pushImageData(prop, imageUrl);
});
const pushImageData = (entity, imageUrl) => {
    if (entity) {
        if (!entity.images) {
            entity.images = [imageUrl];
        }
        else {
            entity.images.push(imageUrl);
        }
        entity.save();
    }
    else {
        console.log("no images property in object");
    }
};
//# sourceMappingURL=UploadNodes.js.map