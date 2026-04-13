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