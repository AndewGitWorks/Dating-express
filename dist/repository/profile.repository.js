"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePrismaCreate = ProfilePrismaCreate;
exports.ProfilePrismaInterests = ProfilePrismaInterests;
exports.ProfilePrismaAddBio = ProfilePrismaAddBio;
exports.GetUserSimpleProfile = GetUserSimpleProfile;
exports.getUserFullProfile = getUserFullProfile;
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
async function getUserFullProfile(userId) {
    const response = await prisma_1.prisma.user.findFirstOrThrow({
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
