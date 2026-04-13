"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMusicToUser = exports.GetMusic = void 0;
const music_repository_1 = require("../repository/music.repository");
const profile_service_1 = require("../services/profile.service");
const GetMusic = async (req, res) => {
    try {
        const music = await (0, music_repository_1.GetAllMusic)();
        return res.json(music);
    }
    catch (e) {
        return res.status(500).json({
            message: "Failed to load interests",
        });
    }
};
exports.GetMusic = GetMusic;
const AddMusicToUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { music } = req.body;
        const { extra_music } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!music || !Array.isArray(music)) {
            return res.status(400).json({ message: "Invalid interests format" });
        }
        if (extra_music) {
            await (0, profile_service_1.AddExtraMusicToUserService)(userId, extra_music);
        }
        await (0, profile_service_1.AddMusicToUserService)(userId, music);
        return res.status(200).json({ message: "Interests added successfully" });
    }
    catch (e) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.AddMusicToUser = AddMusicToUser;
