import TelegramBot from "node-telegram-bot-api";
import { env } from "../env";

const token = env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});
bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, "Wassup", {
        reply_markup:{
            inline_keyboard:[
                [
                    {
                    text: "Open app",
                    web_app: {url: env.AUTH_ENTRY}
                    },
                ],
            ],
        },
    });
});