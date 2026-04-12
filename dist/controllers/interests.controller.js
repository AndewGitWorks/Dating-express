"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInterestsToUser = exports.GetInterests = void 0;
const interests_repository_1 = require("../repository/interests.repository");
const profile_service_1 = require("../services/profile.service");
const GetInterests = async (req, res) => {
    try {
        const interest = await (0, interests_repository_1.GetAllInterests)();
        return res.json(interest);
    }
    catch (e) {
        return res.status(500).json({
            message: "Failed to load interests",
        });
    }
};
exports.GetInterests = GetInterests;
const AddInterestsToUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { interests } = req.body;
        const { extra_interest } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!interests || !Array.isArray(interests)) {
            return res.status(400).json({ message: "Invalid interests format" });
        }
        if (extra_interest) {
            await (0, profile_service_1.AddExtraInterestsToUserService)(userId, extra_interest);
        }
        await (0, profile_service_1.AddInterestsToUserService)(userId, interests);
        return res.status(200).json({ message: "Interests added successfully" });
    }
    catch (e) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.AddInterestsToUser = AddInterestsToUser;
