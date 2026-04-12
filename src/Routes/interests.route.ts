import { Router } from "express";
import { GetInterests } from "../controllers/interests.controller";



const router = Router();

router.get("/interests", GetInterests);

export default router;