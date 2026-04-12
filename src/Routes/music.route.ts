import { Router } from "express";
import { AddMusicToUser, GetMusic } from "../controllers/music.controller";

const router = Router();

router.get("/all", GetMusic);
router.post("/add", AddMusicToUser)
export default router;