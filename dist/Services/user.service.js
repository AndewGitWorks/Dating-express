"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.GetUserByIdAsync = GetUserByIdAsync;
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
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
    try {
        const city = await (0, city_service_1.getCityByName)(userData.city);
        if (!city) {
            throw new custom_exceptions_1.BadRequestError(`City: ${userData.city} is invalid`);
        }
        const res = (0, user_repository_1.UserPrismaCreate)(userData, city);
        return res;
    }
    catch (e) {
        logger_1.default.error({ message: e.message });
        throw e;
    }
}
async function GetUserByIdAsync(userId) {
    const usr = await (0, user_repository_1.UserPrismaFindUnique)(userId);
    if (!usr) {
        throw new custom_exceptions_1.NotFoundError();
    }
    const response = {
        name: usr.Name,
        gender: usr.Gender,
        age: usr.Age,
        city: usr.City?.Name,
    };
    return response;
}
