import { NextFunction, Request, Response } from "express";
import { BadRequestError, AppError } from "../exceptions/custom.exceptions";
import { prisma } from "../prisma";
import { signToken } from "../utils/jwt";
import logger from "../utils/logger";
import { createUser } from "../services/user.service";
import { UserPrismaTgUnique } from "../repository/user.repository";


function validateCreateUserRequest(body: any) {
    if (!body?.telegramId) {
        throw new BadRequestError("telegramId is required");
    }

    if (!body?.name || typeof body.name !== "string") {
        throw new BadRequestError("name is required");
    }

    if (!body?.gender || typeof body.gender !== "string") {
        throw new BadRequestError("gender is required");
    }

    if (body.age === undefined || body.age === null) {
        throw new BadRequestError("age is required");
    }

    if (typeof body.age !== "number") {
        const parsedAge = Number(body.age);
        if (Number.isNaN(parsedAge)) {
            throw new BadRequestError("age must be a number");
        }
        body.age = parsedAge;
    }

    if (!body?.city || typeof body.city !== "string") {
        throw new BadRequestError("city is required");
    }

    return body;
}


export const auth = async (req: Request, res: Response) => {
    try {
        const userData = validateCreateUserRequest(req.body);
        const telegramId = String(userData.telegramId);

        let user = await UserPrismaTgUnique(telegramId);

        if (!user) {
            try {
                user = await createUser(userData);
            } catch (e) {
                logger.warn("User creation failed", {
                    error: e instanceof Error ? e.message : e,
                    userData,
                });

                if (e instanceof AppError) {
                    return res.status(e.statusCode).json({ message: e.message });
                }

                return res.status(500).json({ message: "Failed to create user" });
            }
        }

        if (!user) {
            throw new Error("Auth failed to resolve created user");
        }

        const token = signToken(user.Id);

        return res.json({
            token,
            user: {
                id: user.Id,
                username: user.Username,
            },
        });
    } catch (error) {
        if (error instanceof AppError) {
            logger.warn("Auth validation failed", { message: error.message });
            return res.status(error.statusCode).json({ message: error.message });
        }

        logger.error("Auth error", {
            error: error instanceof Error ? error.message : error,
        });

        return res.status(500).json({ message: "Internal server error" });
    }
};


export const me = async (req: Request, res: Response, next: NextFunction) => {
    res.json({
        userId: (req as any).user?.userId,
    }) ?? next();
};