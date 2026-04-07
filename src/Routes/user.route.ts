import { Request, Response, Router } from "express";

const router = Router();


router.get("/", async(req:Request, res:Response) =>
{
    res.json("Something");
});



export default router;