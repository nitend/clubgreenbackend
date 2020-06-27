"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageProcessing_1 = require("./imageProcessing");
const config_1 = require("../config");
exports.imgUpload = (app, nodes) => {
    const storage = multer_1.default.diskStorage({
        destination: function (req, _file, cb) {
            var node = getnode(req.originalUrl);
            const imgDir = getFullFilepath(req.body.targetId, node);
            makeDir(imgDir);
            cb(null, imgDir);
        },
        filename: function (req, file, cb) {
            cb(null, req.body.targetId + '-' + Date.now() + path_1.default.extname(file.originalname));
        }
    });
    function makeDir(dir) {
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
    }
    const getFullFilepath = (targetId, node) => {
        var _a;
        return config_1.IMAGE_BASE_DIR + ((_a = node) === null || _a === void 0 ? void 0 : _a.imageUrl) + "" + targetId + "/";
    };
    const upload = multer_1.default({ storage: storage }).single('imageFile');
    storage._handleFile;
    function getnode(requestUrl) {
        return nodes.find((node) => {
            if (node.uploadUrl === requestUrl) {
                return true;
            }
            return false;
        });
    }
    nodes.map((node) => {
        app.post(node.uploadUrl, (req, res) => {
            upload(req, res, (err) => {
                if (err) {
                    res.type('application/json');
                    res.sendStatus(400);
                    res.end();
                }
                else {
                    const id = req.body.targetId;
                    const fullFilename = node.imageUrl + id + "/" + req.file.filename;
                    imageProcessing_1.resizeImage(getFullFilepath(id, node) + req.file.filename, imageProcessing_1.smallSize);
                    imageProcessing_1.resizeImage(getFullFilepath(id, node) + req.file.filename, imageProcessing_1.mediumSize);
                    imageProcessing_1.resizeImage(getFullFilepath(id, node) + req.file.filename, imageProcessing_1.largeSize);
                    node.handleFileSaved(id, fullFilename);
                    res.type('application/json');
                    res.sendStatus(200);
                    res.end();
                }
            });
        });
    });
};
//# sourceMappingURL=imageUploader.js.map