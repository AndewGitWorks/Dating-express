import { Router } from "express";
import { GetMyPhotosController, GetMyPhotosWithPrimaryController, GetMyPrimaryPhotoController, UploadPhotoController } from "../controllers/user.controller";
import { upload } from "../middleware/uploads.middleware";


const router = Router();

router.get("/photos", GetMyPhotosController);

router.get("/full", GetMyPhotosWithPrimaryController);

router.get("/primary", GetMyPrimaryPhotoController);

router.post("/upload", upload.single("file"),UploadPhotoController);

// router.get("/users/:userId/photos", GetUserPhotosController);

export default router;