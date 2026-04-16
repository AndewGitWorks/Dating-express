import { join } from "path";
import { prisma } from "../prisma";

export async function ProfilePrismaCreate(
    db: PrismaClientOrTx,
    userId: string
) {
    return db.profile.create({
        data: {
            UserId: userId,
        },
    });
}

export async function ProfilePrismaInterests(
    userId: string,
    interests: string[],
): Promise<void> {

    const dbInterests = await prisma.interest.findMany({
        where: {
            Name: {
                in: interests,
            },
        },
    });

    const data = dbInterests.map((interest) => ({
        UserId: userId,
        InterestId: interest.Id,
    }));

    await prisma.userInterest.createMany({
        data,
        skipDuplicates: true,
    });
}

export async function ProfilePrismaAddBio(
    userId: string,
    bio: string
) {
    return prisma.profile.upsert({
        where: {
            UserId: userId,
        },
        update: {
            Bio: bio,
        },
        create: {
            UserId: userId,
            Bio: bio,
        },
    });
}


export async function GetUserSimpleProfile(usrId: string) {
    return await prisma.user.findFirstOrThrow({
        where: {
            Id: usrId
        },
        select: {
            Name: true,
            Age: true,
        },
    })
}


export async function getUserFullProfile(userId: string) {
    const response = await prisma.user.findFirstOrThrow({
        where: { Id: userId },
        select: {
            Name: true,
            Age: true,

            City: {
                select: { Name: true }
            },

            Photos: {
                select: { Url: true }
            },

            Profile: {
                select: {
                    Bio: true,
                    InterestsExtra: true,
                    MusicExtra: true,
                }
            },

            Interests: {
                select: {
                    Interest: {
                        select: { Name: true }
                    }
                }
            },

            Music: {
                select: {
                    Music: {
                        select: { Name: true }
                    }
                }
            }
        }
    });
    return response;
}
