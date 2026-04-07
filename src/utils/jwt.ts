import jwt from "jsonwebtoken";
import { env } from "../env";


const JWT_SECRET = env.JWT_TOKEN;

export const signToken = (userId: string)=>{
    return jwt.sign({userId}, JWT_SECRET,{
        expiresIn:"1d",
    });
};