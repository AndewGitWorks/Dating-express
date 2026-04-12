import { startsWith } from "zod";
import { prisma } from "../prisma";
import { AppError } from "../exceptions/custom.exceptions";

export async function getCityFromQueryAsync(query: string)
{
    const cityResponse = await prisma.city.findMany({
        where:{
            Name: {
                startsWith:query,
                mode:'insensitive',
            }
        },
        take: 10,
    });
    return cityResponse;
}


export async function getCityByName(res: string)
{
    const cityRes = await prisma.city.findFirstOrThrow({
        where:{
            Name:{
                equals: res,
            }
        }
    });
    if (!cityRes) {
        throw new AppError(`City not found: ${name}`, 404);
    }
    return cityRes;
}