"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserById = void 0;
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
const user_service_1 = require("../services/user.service");
const GetUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.GetUserByIdAsync)(id);
        return res.status(200).json(user);
    }
    catch (err) {
        if (err instanceof custom_exceptions_1.NotFoundError) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.GetUserById = GetUserById;
