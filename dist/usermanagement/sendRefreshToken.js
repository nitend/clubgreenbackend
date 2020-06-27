"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRefreshToken = (res, token) => {
    res.cookie("jid", token, {
        httpOnly: true,
        path: "/"
    });
};
//# sourceMappingURL=sendRefreshToken.js.map