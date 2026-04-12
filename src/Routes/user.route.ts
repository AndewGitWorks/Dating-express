import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { GetUserById } from "../controllers/user.controller";

const router = Router();


router.get("/", async(req:Request, res:Response) =>
{
    res.json("Something");
});
router.get("/users/:id", authMiddleware, GetUserById);
router.put("/users/profile", authMiddleware, );


export default router;