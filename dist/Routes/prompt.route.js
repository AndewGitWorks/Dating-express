"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prompt_controller_1 = require("../controllers/prompt.controller");
const router = (0, express_1.Router)();
router.post("/create", prompt_controller_1.CreatePrompt);
exports.default = router;
