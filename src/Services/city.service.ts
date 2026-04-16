import { prisma } from "../prisma";
import { BadRequestError, AppError, NotFoundError } from "../exceptions/custom.exceptions";

export async function getCityFromQueryAsync(query: string) {
    const cityResponse = await prisma.city.findMany({
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

export async function getCityByName(cityName: string) {
    const normalizedCity = cityName?.trim();
    if (!normalizedCity) {
        throw new BadRequestError("city is required");
    }

    const cityRes = await prisma.city.findFirst({
        where: {
            Name: {
                equals: normalizedCity,
                mode: "insensitive",
            },
        },
    });

    if (!cityRes) {
        throw new BadRequestError(`City: ${normalizedCity} is invalid`);
    }

    return cityRes;
}


export async function UpdateUserCity(userId: string, newCity: string) {
    const updatedUser = await prisma.user.update({
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