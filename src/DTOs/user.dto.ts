import { NOTFOUND } from "dns/promises";
import { prisma } from "../prisma";
async function getCityFromDb(cityRequest : string){
    const city = await prisma.city.findFirst({
        where:{
            Name: cityRequest
        }
    });
    const cityName = city?.Name;
    if(!cityName){
        throw new Error(`City ${cityRequest} not found in database`);
    }
    if(cityName.toLowerCase() !== cityRequest.toLowerCase()){
        throw new Error(`City ${cityRequest} not found in database`);
    }
    return city;
}

export interface CreateUserDto
{
    telegramId: string,
    telegramUserName: string,
    userName: string,
    userAge: number,
    city: string
}


