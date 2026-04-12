"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMusic = void 0;
const music_repository_1 = require("../repository/music.repository");
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
