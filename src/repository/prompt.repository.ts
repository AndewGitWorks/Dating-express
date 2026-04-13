import { prisma } from "../prisma";



export async function PromptPrismaCreate(userId: string, text: string) {
    return prisma.$transaction(async (tx) => {
        return await tx.prompt.create({
            data: {
                UserId: userId,
                Text: text,
            },
        });
    });
}

