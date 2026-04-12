import { CreateUserDto, GetUserResponse } from '../DTOs/user.dto';
import { AppError, BadRequestError, NotFoundError } from '../exceptions/custom.exceptions';
import { prisma } from '../prisma'
import { UserPrismaCreate, UserPrismaFindUnique } from '../repository/user.repository';
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
    try {
        const city = await getCityByName(userData.city);
        if(!city)
        {
            throw new BadRequestError(`City: ${userData.city} is invalid`);
        }
        const res = UserPrismaCreate(userData, city);
        return res;

    } catch (e) {
        logger.error({ message: (e as Error).message });
        throw e;
    }
}


export async function GetUserByIdAsync(userId: string): Promise<GetUserResponse> {
    const usr = await UserPrismaFindUnique(userId);
    if (!usr) {
        throw new NotFoundError();
    }

    const response: GetUserResponse = {
        name: usr.Name,
        gender: usr.Gender,
        age: usr.Age,
        city: usr.City?.Name,
    };

    return response;
}