import { Router } from "express";
import { telegramAuth } from "../controllers/auth.controller";


const router = Router();


router.post("/tg", telegramAuth);

export default router;