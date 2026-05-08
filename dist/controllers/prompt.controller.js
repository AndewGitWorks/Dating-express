"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePrompt = void 0;
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
const profile_service_1 = require("../Services/profile.service");
const CreatePrompt = async (req, res) => {
    const data = req.body;
    if (!data) {
        throw new custom_exceptions_1.BadRequestError();
    }
    const prompt = await (0, profile_service_1.CreatePromptService)(data.userId, data.text);
    if (!prompt) {
        throw new custom_exceptions_1.AppError("Cannot create prompt");
    }
    return res.status(200).json({ message: "prompt has been created" });
};
exports.CreatePrompt = CreatePrompt;
