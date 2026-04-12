import { Request, Response } from "express";
import { GetAllInterests } from "../repository/interests.repository";
import { AddExtraInterestsToUserService, AddInterestsToUserService } from "../services/profile.service";



export const GetInterests = async(req:Request, res:Response) =>
{
    try{
        const interest = await GetAllInterests();
        return res.json(interest);
    }catch(e){
        return res.status(500).json({
            message: "Failed to load interests",
        });
    }
};


export const AddInterestsToUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.id;
        const { interests } = req.body;
        const {extra_interest} = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!interests || !Array.isArray(interests)) {
            return res.status(400).json({ message: "Invalid interests format" });
        }
        if(extra_interest)
        {
            await AddExtraInterestsToUserService(userId, extra_interest);
        }
        await AddInterestsToUserService(userId, interests);

        return res.status(200).json({ message: "Interests added successfully" });

    } catch (e) {
        return res.status(500).json({ message: "Internal server error" });
    }
};