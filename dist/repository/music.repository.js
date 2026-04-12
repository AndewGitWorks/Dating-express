"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllMusic = GetAllMusic;
const prisma_1 = require("../prisma");
async function GetAllMusic() {
    return prisma_1.prisma.music.findMany({
        orderBy: {
            Name: 'asc',
        },
    });
}
