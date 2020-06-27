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
const auth_1 = require("./auth");
const sendRefreshToken_1 = require("./sendRefreshToken");
const emailverification_1 = require("../emailverification/emailverification");
const jsonwebtoken_1 = require("jsonwebtoken");
const database_1 = require("../database");
exports.usermanager = (app) => {
    const db = database_1.Users;
    app.post('/refresh_token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: '' });
        }
        let payload = null;
        try {
            payload = jsonwebtoken_1.verify(token, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: '' });
        }
        const result = yield db.findByPropValue("id", payload.userId);
        const user = result[0];
        if (!user) {
            return res.send({ ok: false, accessToken: '' });
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: '' });
        }
        sendRefreshToken_1.sendRefreshToken(res, auth_1.createRefreshToken(user));
        return res.send({ ok: true, accessToken: auth_1.createAccessToken(user) });
    }));
    app.get('/verify_email', function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.query.token;
            const validEmail = yield emailverification_1.verifyToken(token);
            if (validEmail) {
                const result = yield db.findByPropValue("email", validEmail);
                const user = result[0];
                if (user) {
                    user.email_verified = true;
                    db.replace(user);
                    res.send("Nutzerkonto aktiviert");
                }
            }
            else {
                res.send("Aktivierungscode abgelaufen");
            }
        });
    });
};
//# sourceMappingURL=usermanager.js.map