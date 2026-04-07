import { Request, Response, NextFunction, response, request } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) =>{

    const auth = req.headers.authorization;

    if(!auth){
        return res.status(401).json({message:"No token"});
    }

    const token = auth.split(" ")[1];

    try{
        const decode = jwt.verify(token, env.JWT_TOKEN!) as any;
        req.user = decode;
        next();
    }catch{
        return res.status(401).json({message:"Invalid token"});
    }
}