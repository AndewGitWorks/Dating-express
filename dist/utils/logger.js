"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logDir = path_1.default.join(__dirname, '../../logs');
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
// Красивый формат для консоли
const consoleFormat = winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({
    format: 'DD-MM-YYYY HH:mm:ss',
}), winston_1.default.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
}));
// ТАКОЙ ЖЕ красивый формат для файла (убираем JSON)
const fileFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({
    format: 'DD-MM-YYYY HH:mm:ss',
}), winston_1.default.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
}));
const logger = winston_1.default.createLogger({
    level: 'info',
    transports: [
        new winston_1.default.transports.Console({
            format: consoleFormat,
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join(logDir, 'combined.log'),
            format: fileFormat,
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join(logDir, 'error.log'),
            level: 'error',
            format: fileFormat,
        }),
    ],
});
exports.default = logger;
