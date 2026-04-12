import { NextFunction, Request, Response } from "express";
import { AppError } from "../exceptions/custom.exceptions";
import logger from "../utils/logger";

export const errorMiddleware = (err: Error, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof AppError) {
        logger.warn(err.message);
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        message: "Internal server error",
    });
};