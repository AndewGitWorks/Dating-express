"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.GetUserByIdAsync = GetUserByIdAsync;
exports.GetUserByTgIdAsync = GetUserByTgIdAsync;
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
const prisma_1 = require("../prisma");
const profile_repository_1 = require("../repository/profile.repository");
const user_repository_1 = require("../repository/user.repository");
const logger_1 = __importDefault(require("../utils/logger"));
const city_service_1 = require("./city.service");
// export async function (cityRequest : string){
//     const city = await prisma.city.findFirst({
//         where:{
//             Name: cityRequest
//         }
//     });
//     const cityName = city?.Name;
//     if(!cityName){
//         throw new Error(`City ${cityRequest} not found in database`);
//     }
//     if(cityName.toLowerCase() !== cityRequest.toLowerCase()){
//         throw new Error(`City ${cityRequest} not found in database`);
//     }
//     return city;
// }
async function createUser(userData) {
    const city = await (0, city_service_1.getCityByName)(userData.city);
    if (!city) {
        throw new custom_exceptions_1.BadRequestError(`City: ${userData.city} is invalid`);
    }
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const user = await (0, user_repository_1.UserPrismaCreate)(tx, userData, city.Id);
        await (0, profile_repository_1.ProfilePrismaCreate)(tx, user.Id);
        logger_1.default.warn("Create user transaction failed");
        return user;
    });
    return result;
}
async function GetUserByIdAsync(userId) {
    const usr = await (0, user_repository_1.UserPrismaFindUnique)(userId);
    const response = {
        name: usr.Name,
        gender: usr.Gender,
        age: usr.Age,
        city: usr.City?.Name,
    };
    return response;
}
async function GetUserByTgIdAsync(tgId) {
    const usr = await (0, user_repository_1.UserPrismaTgUnique)(tgId);
    const response = {
        name: usr.Name,
        gender: usr.Gender,
        age: usr.Age,
        city: usr.City?.Name,
    };
    return response;
}
