"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const interests_controller_1 = require("../controllers/interests.controller");
const profile_controller_1 = require("../controllers/profile.controller");
const router = (0, express_1.Router)();
router.post("/interests/add", interests_controller_1.AddInterestsToUser);
router.post("/bio/add", profile_controller_1.AddBio);
exports.default = router;
