import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../env";

interface JwtPayload {
    id: string;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const auth = req.headers.authorization;

    if (!auth) {
        return res.status(401).json({ message: "No token" });
    }

    const token = auth.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }
    console.log("HEADERS:", req.headers);
    console.log("AUTH:", req.headers.authorization);
    try {
        const decoded = jwt.verify(token, env.JWT_TOKEN!) as any;

        req.user = {
            id: decoded.userId,
        };

        next();
    } catch (e) {
    console.log("JWT ERROR:", (e as Error).message);
    return res.status(401).json({ message: "Invalid token" });
    }
};