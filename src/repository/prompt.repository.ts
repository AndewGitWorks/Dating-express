import { prisma } from "../prisma";



export async function PromptPrismaCreate(userId: string, text: string) {
    return prisma.$transaction(async (tx: { prompt: { create: (arg0: { data: { UserId: string; Text: string; }; }) => any; }; }) => {
        return await tx.prompt.create({
            data: {
                UserId: userId,
                Text: text,
            },
        });
    });
}

