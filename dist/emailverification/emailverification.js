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
const sendEmail_1 = require("./sendEmail");
const genToken_1 = require("./genToken");
const database_1 = require("../database");
const validation_time = 24 * 60 * 60 * 1000;
const db = database_1.Emails;
exports.sendVerification = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const token = genToken_1.getToken();
    sendEmail_1.sendVerificationEmail(email, token);
    const result = yield db.insert({
        id: "",
        creationDate: "",
        deleted: false,
        verified: false,
        email: email,
        verification_token: token,
        verification_date: Date.now()
    });
    if (result) {
        return true;
    }
    return false;
});
exports.verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const email = yield db.findByPropValue("verification_token", token);
    const emailver = email[0];
    if (emailver && emailver.verification_date) {
        var duedate = emailver.verification_date + validation_time;
        console.log(Date.now() + " now and valid " + duedate);
        if (Date.now() < duedate) {
        }
        else {
        }
    }
    return emailver.email;
});
//# sourceMappingURL=emailverification.js.map