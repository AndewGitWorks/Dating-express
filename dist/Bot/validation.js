"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function checkTelegramAuth(data, botToken) {
    const secret = crypto_1.default
        .createHash("sha256")
        .update(botToken)
        .digest();
    const params = new URLSearchParams(data);
    const hash = params.get("hash");
    params.delete("hash");
    const sorted = [...params.entries()]
        .sort()
        .map(([key, val]) => `${key}=${val}`)
        .join("\n");
    const hmac = crypto_1.default
        .createHmac("sha256", secret)
        .update(sorted)
        .digest("hex");
    return hmac === hash;
}
exports.default = checkTelegramAuth;
