"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, printf } = winston_1.format;
exports.logger = winston_1.createLogger({
    level: 'info',
    format: combine(timestamp(), printf(info => `${info.timestamp} ${info.level} : ${info.label}`)),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.transports.File({ filename: 'combined.log' }),
    ],
});
if (process.env.NODE_ENV !== 'production') {
    exports.logger.add(new winston_1.transports.Console({
        format: winston_1.format.simple(),
    }));
}
//# sourceMappingURL=Logger.js.map