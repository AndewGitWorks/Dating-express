"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddBio = void 0;
const profile_service_1 = require("../services/profile.service");
const AddBio = async (req, res) => {
    const bioText = req.body;
    const userId = req.user?.id;
    await (0, profile_service_1.AddBioService)(userId, bioText);
    return res.status(200).json({ message: "Bio added" });
};
exports.AddBio = AddBio;
