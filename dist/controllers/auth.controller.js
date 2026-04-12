"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.auth = void 0;
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
const jwt_1 = require("../utils/jwt");
const logger_1 = __importDefault(require("../utils/logger"));
const user_service_1 = require("../services/user.service");
const user_repository_1 = require("../repository/user.repository");
function validateCreateUserRequest(body) {
    if (!body?.telegramId) {
        throw new custom_exceptions_1.BadRequestError("telegramId is required");
    }
    if (!body?.name || typeof body.name !== "string") {
        throw new custom_exceptions_1.BadRequestError("name is required");
    }
    if (!body?.gender || typeof body.gender !== "string") {
        throw new custom_exceptions_1.BadRequestError("gender is required");
    }
    if (body.age === undefined || body.age === null) {
        throw new custom_exceptions_1.BadRequestError("age is required");
    }
    if (typeof body.age !== "number") {
        const parsedAge = Number(body.age);
        if (Number.isNaN(parsedAge)) {
            throw new custom_exceptions_1.BadRequestError("age must be a number");
        }
        body.age = parsedAge;
    }
    if (!body?.city || typeof body.city !== "string") {
        throw new custom_exceptions_1.BadRequestError("city is required");
    }
    return body;
}
const auth = async (req, res) => {
    try {
        const userData = validateCreateUserRequest(req.body);
        const telegramId = String(userData.telegramId);
        let user = await (0, user_repository_1.UserPrismaTgUnique)(telegramId);
        if (!user) {
            try {
                user = await (0, user_service_1.createUser)(userData);
            }
            catch (e) {
                logger_1.default.warn("User creation failed", {
                    error: e instanceof Error ? e.message : e,
                    userData,
                });
                if (e instanceof custom_exceptions_1.AppError) {
                    return res.status(e.statusCode).json({ message: e.message });
                }
                return res.status(500).json({ message: "Failed to create user" });
            }
        }
        if (!user) {
            throw new Error("Auth failed to resolve created user");
        }
        const token = (0, jwt_1.signToken)(user.Id);
        return res.json({
            token,
            user: {
                id: user.Id,
                username: user.Username,
            },
        });
    }
    catch (error) {
        if (error instanceof custom_exceptions_1.AppError) {
            logger_1.default.warn("Auth validation failed", { message: error.message });
            return res.status(error.statusCode).json({ message: error.message });
        }
        logger_1.default.error("Auth error", {
            error: error instanceof Error ? error.message : error,
        });
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.auth = auth;
const me = async (req, res, next) => {
    res.json({
        userId: req.user?.userId,
    }) ?? next();
};
exports.me = me;
