"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePrismaCreate = ProfilePrismaCreate;
exports.ProfilePrismaInterests = ProfilePrismaInterests;
exports.ProfilePrismaAddBio = ProfilePrismaAddBio;
exports.GetUserSimpleProfile = GetUserSimpleProfile;
const prisma_1 = require("../prisma");
async function ProfilePrismaCreate(db, userId) {
    return db.profile.create({
        data: {
            UserId: userId,
        },
    });
}
async function ProfilePrismaInterests(userId, interests) {
    const dbInterests = await prisma_1.prisma.interest.findMany({
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
    await prisma_1.prisma.userInterest.createMany({
        data,
        skipDuplicates: true,
    });
}
async function ProfilePrismaAddBio(userId, bio) {
    return prisma_1.prisma.profile.upsert({
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
async function GetUserSimpleProfile(usrId) {
    return await prisma_1.prisma.user.findFirstOrThrow({
        where: {
            Id: usrId
        },
        select: {
            Name: true,
            Age: true,
        },
    });
}
