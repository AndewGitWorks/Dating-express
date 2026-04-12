"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCityFromQueryAsync = getCityFromQueryAsync;
exports.getCityByName = getCityByName;
const prisma_1 = require("../prisma");
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
async function getCityFromQueryAsync(query) {
    const cityResponse = await prisma_1.prisma.city.findMany({
        where: {
            Name: {
                startsWith: query,
                mode: 'insensitive',
            }
        },
        take: 10,
    });
    return cityResponse;
}
async function getCityByName(res) {
    const cityRes = await prisma_1.prisma.city.findFirstOrThrow({
        where: {
            Name: {
                equals: res,
            }
        }
    });
    if (!cityRes) {
        throw new custom_exceptions_1.AppError(`City not found: ${name}`, 404);
    }
    return cityRes;
}
