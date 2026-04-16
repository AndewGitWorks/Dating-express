import { CreateUserDto, GetUserResponse } from '../DTOs/user.dto';
import { AppError, BadRequestError, NotFoundError } from '../exceptions/custom.exceptions';
import { prisma } from '../prisma'
import { ProfilePrismaCreate } from '../repository/profile.repository';
import { UserPrismaCreate, UserPrismaFindUnique, UserPrismaTgUnique } from '../repository/user.repository';
import logger from '../utils/logger';
import { getCityByName } from './city.service';

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
export async function createUser(userData: CreateUserDto) {
    const city = await getCityByName(userData.city);

    if (!city) {
        throw new BadRequestError(`City: ${userData.city} is invalid`);
    }

    const result = await prisma.$transaction(async (tx) => {
        const user = await UserPrismaCreate(tx, userData, city.Id);

        await ProfilePrismaCreate(tx, user.Id);
        logger.warn("Create user transaction failed");
        return user;
    });

    return result;
}


export async function GetUserByIdAsync(userId: string): Promise<GetUserResponse> {
    const usr = await UserPrismaFindUnique(userId);
    const response: GetUserResponse = {
        name: usr.Name,
        gender: usr.Gender,
        age: usr.Age,
        city: usr.City?.Name,
    };

return response;
}


export async function GetUserByTgIdAsync(tgId: string) : Promise<GetUserResponse>
{
    const usr = await UserPrismaTgUnique(tgId);
    const response: GetUserResponse = {
        name: usr.Name,
        gender: usr.Gender,
        age: usr.Age,
        city: usr.City?.Name,
    };
    return response;
}