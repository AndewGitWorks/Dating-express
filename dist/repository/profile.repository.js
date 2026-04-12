"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePrismaCreate = ProfilePrismaCreate;
exports.ProfilePrismaInterests = ProfilePrismaInterests;
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
