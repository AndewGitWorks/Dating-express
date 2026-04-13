"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../env");
const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ message: "No token" });
    }
    const token = auth.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }
    console.log("HEADERS:", req.headers);
    console.log("AUTH:", req.headers.authorization);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.JWT_TOKEN);
        req.user = {
            id: decoded.userId,
        };
        next();
    }
    catch (e) {
        console.log("JWT ERROR:", e.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
