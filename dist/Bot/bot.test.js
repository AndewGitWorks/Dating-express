"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const env_1 = require("../env");
const token = env_1.env.BOT_TOKEN;
const bot = new node_telegram_bot_api_1.default(token, { polling: true });
bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Wassup", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "Open app",
                        web_app: { url: env_1.env.AUTH_ENTRY }
                    },
                ],
            ],
        },
    });
});
