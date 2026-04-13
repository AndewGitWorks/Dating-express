import { Router } from "express";
import { CreatePrompt } from "../controllers/prompt.controller";



const router = Router();

router.post("/create", CreatePrompt);

export default router;