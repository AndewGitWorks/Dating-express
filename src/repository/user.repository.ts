import { City } from "@prisma/client";
import { CreateUserDto, UpdateUserDto } from "../DTOs/user.dto";
import { prisma } from "../prisma";
import { AppError } from "../exceptions/custom.exceptions";

export async function UserPrismaCreate(userData: CreateUserDto, city: City) {
    const newUser = await prisma.user.create({
        data: {
            TelegramId: String(userData.telegramId),
            Username: userData.telegramName ?? `user_${userData.telegramId}`,
            Name: userData.name,
            Age: userData.age,
            CityId: city.Id,
            Gender: userData.gender,
        },
    });
    if(!newUser)
    {
        throw new AppError("Server error", 500);
    }
    return newUser;
}
export async function UserPrismaUpdate(req: UpdateUserDto, userId: string, cityId: string)
{
    const usr = await prisma.user.update({
        where:{
            Id: userId
        },
        data: {
            Name: req.name,
            CityId: cityId,
            Age: req.age,
            Gender: req.gender
        },
    });
    if(!usr)
    {
        throw new AppError("Server exception");
    }
    return usr;
}

export async function UserPrismaFindUnique(req: string)
{
    const usr = await prisma.user.findUniqueOrThrow(
        {
            where:{
                Id: req,
            },
            include:{
                City: true
            }
        }
    );
    return usr;
}