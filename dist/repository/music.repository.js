"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllMusic = GetAllMusic;
exports.GetMusicByName = GetMusicByName;
exports.AddMusicToUserRepository = AddMusicToUserRepository;
exports.AddExtraMusicToUserRepository = AddExtraMusicToUserRepository;
const prisma_1 = require("../prisma");
async function GetAllMusic() {
    return prisma_1.prisma.music.findMany({
        orderBy: {
            Name: 'asc',
        },
    });
}
async function GetMusicByName(names) {
    return prisma_1.prisma.music.findMany({
        where: {
            Name: {
                in: names,
            },
        },
    });
}
async function AddMusicToUserRepository(userId, music) {
    const data = music.map((i) => ({
        UserId: userId,
        MusicId: i.Id,
    }));
    return prisma_1.prisma.userMusic.createMany({
        data,
        skipDuplicates: true,
    });
}
;
async function AddExtraMusicToUserRepository(userId, extra_music) {
    return prisma_1.prisma.profile.upsert({
        where: {
            UserId: userId,
        },
        update: {
            MusicExtra: extra_music,
        },
        create: {
            UserId: userId,
            MusicExtra: extra_music,
        },
    });
}
;
