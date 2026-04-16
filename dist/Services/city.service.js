"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityFromQueryAsync = getCityFromQueryAsync;
exports.getCityByName = getCityByName;
exports.UpdateUserCity = UpdateUserCity;
const prisma_1 = require("../prisma");
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
async function getCityFromQueryAsync(query) {
    const cityResponse = await prisma_1.prisma.city.findMany({
        where: {
            Name: {
                startsWith: query,
                mode: "insensitive",
            },
        },
        take: 10,
    });
    return cityResponse;
}
async function getCityByName(cityName) {
    const normalizedCity = cityName?.trim();
    if (!normalizedCity) {
        throw new custom_exceptions_1.BadRequestError("city is required");
    }
    const cityRes = await prisma_1.prisma.city.findFirst({
        where: {
            Name: {
                equals: normalizedCity,
                mode: "insensitive",
            },
        },
    });
    if (!cityRes) {
        throw new custom_exceptions_1.BadRequestError(`City: ${normalizedCity} is invalid`);
    }
    return cityRes;
}
async function UpdateUserCity(userId, newCity) {
    const updatedUser = await prisma_1.prisma.user.update({
        where: {
            Id: userId
        },
        data: {
            City: {
                connect: {
                    Name: newCity
                }
            }
        },
        include: {
            City: true
        }
    });
    return updatedUser;
}
