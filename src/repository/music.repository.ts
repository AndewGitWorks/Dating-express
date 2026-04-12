import { prisma } from "../prisma";

export async function GetAllMusic() {
    return prisma.music.findMany({
        orderBy: {
            Name: 'asc',
        },
    });
}


export async function GetMusicByName(names: string[]) {
    return prisma.music.findMany({
        where: {
            Name: {
                in: names,
            },
        },
    });
}


export async function AddMusicToUserRepository(
    userId: string,
    music: { Id: string }[]
) {
    const data = music.map((i) => ({
        UserId: userId,
        MusicId: i.Id,
    }));

    return prisma.userMusic.createMany({
        data,
        skipDuplicates: true,
    });
};


export async function AddExtraMusicToUserRepository(
    userId: string,
    extra_music: string
) {
    return prisma.profile.upsert({
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
};