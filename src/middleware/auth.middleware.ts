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

    try {
        const decoded = jwt.verify(token, env.JWT_TOKEN!) as JwtPayload;

        req.user = {
            id: decoded.id,
        };

        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};