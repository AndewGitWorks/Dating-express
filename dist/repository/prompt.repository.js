"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptPrismaCreate = PromptPrismaCreate;
const prisma_1 = require("../prisma");
async function PromptPrismaCreate(userId, text) {
    return prisma_1.prisma.$transaction(async (tx) => {
        return await tx.prompt.create({
            data: {
                UserId: userId,
                Text: text,
            },
        });
    });
}
