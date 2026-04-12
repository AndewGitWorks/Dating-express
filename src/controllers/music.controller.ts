import { Request, Response } from "express";
import { GetAllMusic } from "../repository/music.repository";

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