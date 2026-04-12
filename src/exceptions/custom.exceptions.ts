import { appendFile } from "fs";

export class AppError extends Error
{
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode = 500)
    {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}


export class BadRequestError extends AppError
{
    constructor(message = "Bad request")
    {
        super(message, 400);
    }
}

export class NotFoundError extends AppError
{
    constructor(message = "Not Found")
    {
        super(message, 404);
    }
}

export class UnauthorizedError extends AppError
{
    constructor(message="Unauthorized")
    {
        super(message, 401);
    }
}

export class PermissionDeniedError extends AppError
{
    constructor(message="You have no permissions")
    {
        super(message, 403);
    }
}