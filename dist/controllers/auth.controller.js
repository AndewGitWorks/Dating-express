"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.auth = void 0;
const prisma_1 = require("../prisma");
const jwt_1 = require("../utils/jwt");
const logger_1 = __importDefault(require("../utils/logger"));
const user_service_1 = require("../services/user.service");
const auth = async (req, res) => {
    try {
        const userData = req.body;
        if (!userData?.telegramId) {
            return res.status(400).json({
                message: "telegramId required",
            });
        }
        let telegramId;
        try {
            telegramId = (userData.telegramId);
        }
        catch {
            return res.status(400).json({
                message: "Invalid telegramId",
            });
        }
        let user = await prisma_1.prisma.user.findUnique({
            where: {
                TelegramId: String(telegramId),
            },
        });
        if (!user) {
            try {
                user = await (0, user_service_1.createUser)(userData);
            }
            catch (e) {
                logger_1.default.warn('User creation failed', {
                    error: e.message,
                    userData,
                });
                if (e.message.includes('City not found')) {
                    return res.status(400).json({
                        message: e.message,
                    });
                }
                return res.status(400).json({
                    message: "Failed to create user",
                });
            }
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
        logger_1.default.error('Auth error', {
            error: error instanceof Error ? error.message : error,
        });
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
exports.auth = auth;
const me = async (req, res, next) => {
    res.json({
        userId: req.user?.userId
    }) ?? next();
};
exports.me = me;
