import { Request, Response } from "express";
import { GetAllMusic } from "../repository/music.repository";
import { AddExtraMusicToUserService, AddMusicToUserService } from "../services/profile.service";

export const GetMusic = async(req:Request, res:Response) =>
{
    try{
        const music  = await GetAllMusic();
        return res.json(music);
    }catch(e){
        return res.status(500).json({
            message: "Failed to load interests",
        });
    }
};
export const AddMusicToUser = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user?.id;
        const { music } = req.body;
        const {extra_music} = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!music || !Array.isArray(music)) {
            return res.status(400).json({ message: "Invalid interests format" });
        }
        if(extra_music)
        {
            await AddExtraMusicToUserService(userId, extra_music);
        }
        await AddMusicToUserService(userId, music);

        return res.status(200).json({ message: "Interests added successfully" });

    } catch (e) {
        return res.status(500).json({ message: "Internal server error" });
    }
};