import { Request, Response } from "express";
import checkTelegramAuth from "../Bot/validation";
import { env } from "../env";
import { prisma } from "../prisma";
import { signToken } from "../utils/jwt";

export const telegramAuth = async (req:Request, res: Response) => 
{
    try{
        const {initData} = req.body;

        if(!initData)
        {
            return res.status(400).json({message:"Data required"});
        }

        const isValid = checkTelegramAuth(
            initData,
            env.BOT_TOKEN
        );

        if(!isValid)
        {
            return res.status(403).json({message: "Invalid telegram data"});
        }

        const params = new URLSearchParams(initData);
        const userRaw = params.get("user");

        if(!userRaw)
        {
            return res.status(400).json({message: "No user data"});
        }
        const tgUser = JSON.parse(userRaw);

        let user = await prisma.user.findUnique({
            where:
            {
                TelegramId: BigInt(tgUser.id),
            },
        });
        if(!user){
            user = await prisma.user.create({
                data:{
                    TelegramId: BigInt(tgUser.id),
                    Username: tgUser.Username || `user_${tgUser.id}`,
                },
            });
        }
        const token = signToken(user.Id);

        return res.json({
            token,
            user:{
                id:user.Id,
                username: user.Username,
            },
        });
    }
    
    catch(error)
    {
        console.error(error);
        res.status(500).json({message: "internal server error"});
    }
}