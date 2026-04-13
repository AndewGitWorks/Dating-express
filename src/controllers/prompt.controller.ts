import { Request, Response } from "express";
import { AppError, BadRequestError } from "../exceptions/custom.exceptions";
import { CreatePromptService } from "../services/profile.service";



export const CreatePrompt = async(req:Request, res:Response) => 
{
    const data = req.body;
    if(!data)
    {
        throw new BadRequestError();
    }
    const prompt = await CreatePromptService(data.userId, data.text);
    if(!prompt)
    {
        throw new AppError("Cannot create prompt");
    }
    return res.status(200).json({message: "prompt has been created"});
}