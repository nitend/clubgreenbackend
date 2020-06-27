"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const SENDGRID_API_KEY = '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';
exports.sendVerificationEmail = (sendto, verification_token) => {
    mail_1.default.setApiKey(SENDGRID_API_KEY);
    const link = "http://localhost:4000/verify_email?token=" + verification_token + "";
    const msg = {
        to: sendto,
        from: 'no-repley@club-gruen.de',
        subject: 'Email bestätigen',
        text: 'Bitte bestätige uns noch deinen Account. Danke.',
        html: '<strong> Bitte bestätige uns noch deine Email-Adresse um deinen Account zu aktivieren jetzt den Account aktivieren </strong>' + ' <a href="' + link + '">Hier klicken zum aktivieren</a>'
    };
    console.log("email send to " + sendto);
    mail_1.default.send(msg);
    return null;
};
exports.isExpired = (timestamp) => {
    const now = Date.now();
    const expireDate = timestamp + (24 * 60 * 60 * 1000);
    if (expireDate > now) {
        return true;
    }
    else {
        return false;
    }
};
//# sourceMappingURL=sendEmail.js.map