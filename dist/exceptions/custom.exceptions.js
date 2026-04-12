"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionDeniedError = exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(message = "Bad request") {
        super(message, 400);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends AppError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class PermissionDeniedError extends AppError {
    constructor(message = "You have no permissions") {
        super(message, 403);
    }
}
exports.PermissionDeniedError = PermissionDeniedError;
