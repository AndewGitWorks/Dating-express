"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPrismaCreate = UserPrismaCreate;
exports.UserPrismaUpdate = UserPrismaUpdate;
exports.UserPrismaFindUnique = UserPrismaFindUnique;
const prisma_1 = require("../prisma");
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
async function UserPrismaCreate(userData, city) {
    const newUser = await prisma_1.prisma.user.create({
        data: {
            TelegramId: String(userData.telegramId),
            Username: userData.telegramName ?? `user_${userData.telegramId}`,
            Name: userData.name,
            Age: userData.age,
            CityId: city.Id,
            Gender: userData.gender,
        },
    });
    if (!newUser) {
        throw new custom_exceptions_1.AppError("Server error", 500);
    }
    return newUser;
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
    return usr;
}
