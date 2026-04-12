import { prisma } from "../prisma";

export async function GetAllInterests()
{
    return prisma.interest.findMany({
        orderBy:{
            Name:'asc',
        },
    });
}

export async function GetInterestsByNames(names: string[]) {
    return prisma.interest.findMany({
        where: {
            Name: {
                in: names,
            },
        },
    });
}

export async function AddInterestsToUserRepository(
    userId: string,
    interests: { Id: string }[]
) {
    const data = interests.map((i) => ({
        UserId: userId,
        InterestId: i.Id,
    }));

    return prisma.userInterest.createMany({
        data,
        skipDuplicates: true,
    });
}


export async function AddExtraInterestsToUserRepository(
    userId: string,
    extra_interest: string
) {
    return prisma.profile.upsert({
        where: {
            UserId: userId,
        },
        update: {
            InterestsExtra: extra_interest,
        },
        create: {
            UserId: userId,
            InterestsExtra: extra_interest,
        },
    });
}