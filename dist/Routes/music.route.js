"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const music_controller_1 = require("../controllers/music.controller");
const router = (0, express_1.Router)();
router.get("/music", music_controller_1.GetMusic);
exports.default = router;
