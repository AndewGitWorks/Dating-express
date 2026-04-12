"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
const logger_1 = __importDefault(require("../utils/logger"));
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof custom_exceptions_1.AppError) {
        logger_1.default.warn(err.message);
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }
    return res.status(500).json({
        message: "Internal server error",
    });
};
exports.errorMiddleware = errorMiddleware;
