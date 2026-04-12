import { Router } from "express";
import { AddInterestsToUser } from "../controllers/interests.controller";


const router = Router();


router.post("/interests/add",AddInterestsToUser);

export default router;