import { Request, Response } from "express";
import { AddBioService } from "../services/profile.service";



export const AddBio = async (req:Request, res: Response) =>
{
    const bioText = req.body;
    const userId = (req as any).user?.id;
    await AddBioService(userId, bioText);
    return res.status(200).json({message: "Bio added"});
}
