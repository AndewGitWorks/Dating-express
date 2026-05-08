import { CreateUserDto, UpdateUserDto } from "../DTOs/user.dto";
import { prisma } from "../prisma";
import { AppError, NotFoundError } from "../exceptions/custom.exceptions";

export async function UserPrismaCreate(
    db: PrismaClientOrTx,
    userData: CreateUserDto,
    cityId: string
) {
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
    if(!usr)
    {
        throw new NotFoundError();
    }
    return usr;
}

export async function UserPrismaTgUnique(req: string)
{
    const usr = await prisma.user.findUnique(
        {
            where:{
                TelegramId: req,
            },
            include:{
                City: true
            }
        }
    );
    return usr;
}

// export async function GetFullUserDataAsync(profileId: string)
// {
//     const response = await prisma.
// }