import { Router } from "express";
import { GetMyPhotosController, GetMyPhotosWithPrimaryController, GetMyPrimaryPhotoController } from "../controllers/user.controller";


const router = Router();

router.get("/me/photos", GetMyPhotosController);

router.get("/me/photos/full", GetMyPhotosWithPrimaryController);

router.get("/me/photos/primary", GetMyPrimaryPhotoController);

// router.get("/users/:userId/photos", GetUserPhotosController);

export default router;