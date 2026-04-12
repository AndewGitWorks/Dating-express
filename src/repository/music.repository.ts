import { prisma } from "../prisma";

export async function GetAllMusic()
{
    return prisma.music.findMany({
        orderBy:{
            Name:'asc',
        },
    });
}