import { Router } from "express";
import { GetMusic } from "../controllers/music.controller";

const router = Router();

router.get("/music", GetMusic);

export default router;