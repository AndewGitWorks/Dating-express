"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrismaCreate = UserPrismaCreate;
exports.UserPrismaUpdate = UserPrismaUpdate;
exports.UserPrismaFindUnique = UserPrismaFindUnique;
exports.UserPrismaTgUnique = UserPrismaTgUnique;
const prisma_1 = require("../prisma");
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
async function UserPrismaCreate(db, userData, cityId) {
    return db.user.create({
        data: {
            TelegramId: String(userData.telegramId),
            Username: userData.telegramName ?? `user_${userData.telegramId}`,
            Name: userData.name,
            Age: userData.age,
            CityId: cityId,
            Gender: userData.gender,
        },
    });
}
async function UserPrismaUpdate(req, userId, cityId) {
    const usr = await prisma_1.prisma.user.update({
        where: {
            Id: userId
        },
        data: {
            Name: req.name,
            CityId: cityId,
            Age: req.age,
            Gender: req.gender
        },
    });
    if (!usr) {
        throw new custom_exceptions_1.AppError("Server exception");
    }
    return usr;
}
async function UserPrismaFindUnique(req) {
    const usr = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            Id: req,
        },
        include: {
            City: true
        }
    });
    if (!usr) {
        throw new custom_exceptions_1.NotFoundError();
    }
    return usr;
}
async function UserPrismaTgUnique(req) {
    const usr = await prisma_1.prisma.user.findUniqueOrThrow({
        where: {
            TelegramId: req,
        },
        include: {
            City: true
        }
    });
    if (!usr) {
        throw new custom_exceptions_1.NotFoundError();
    }
    return usr;
}
