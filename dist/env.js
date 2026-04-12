"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
function getEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing env: ${name}`);
    }
    return value;
}
exports.env = {
    DATABASE_URL: getEnv('DATABASE_URL'),
    BOT_TOKEN: getEnv('BOT_TOKEN'),
    AUTH_ENTRY: getEnv('AUTH_URL_BOT'),
    JWT_TOKEN: getEnv('JWT_TOKEN'),
    PORT_VALUE: getEnv('PORT'),
};
