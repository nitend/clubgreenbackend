"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
exports.resizeImage = (filepath, size) => {
    jimp_1.default.read(filepath, (err, profile) => {
        if (err)
            throw err;
        const newfilepath = filepath.replace(".", size.filenameAppendix + ".");
        profile
            .cover(size.width, size.height, jimp_1.default.HORIZONTAL_ALIGN_CENTER | jimp_1.default.VERTICAL_ALIGN_MIDDLE)
            .write(newfilepath);
    });
};
exports.smallSize = {
    width: 100,
    height: 100,
    filenameAppendix: "-sm"
};
exports.mediumSize = {
    width: 300,
    height: 300,
    filenameAppendix: "-md"
};
exports.largeSize = {
    width: 700,
    height: 400,
    filenameAppendix: "-lg"
};
//# sourceMappingURL=imageProcessing.js.map