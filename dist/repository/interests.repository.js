"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllInterests = GetAllInterests;
exports.GetInterestsByNames = GetInterestsByNames;
exports.AddInterestsToUserRepository = AddInterestsToUserRepository;
exports.AddExtraInterestsToUserRepository = AddExtraInterestsToUserRepository;
const prisma_1 = require("../prisma");
async function GetAllInterests() {
    return prisma_1.prisma.interest.findMany({
        orderBy: {
            Name: 'asc',
        },
    });
}
async function GetInterestsByNames(names) {
    return prisma_1.prisma.interest.findMany({
        where: {
            Name: {
                in: names,
            },
        },
    });
}
async function AddInterestsToUserRepository(userId, interests) {
    const data = interests.map((i) => ({
        UserId: userId,
        InterestId: i.Id,
    }));
    return prisma_1.prisma.userInterest.createMany({
        data,
        skipDuplicates: true,
    });
}
async function AddExtraInterestsToUserRepository(userId, extra_interest) {
    return prisma_1.prisma.profile.upsert({
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
