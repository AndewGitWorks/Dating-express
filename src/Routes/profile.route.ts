import { Router } from "express";
import { AddInterestsToUser } from "../controllers/interests.controller";
import { AddBio } from "../controllers/profile.controller";


const router = Router();


router.post("/interests/add",AddInterestsToUser);
router.post("/bio/add", AddBio);
export default router;