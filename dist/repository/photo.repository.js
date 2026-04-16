"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserPhotos = exports.SetPrimaryPhotoDb = exports.GetPrimaryByUserId = exports.ResetPrimaryPhotos = exports.DeletePhotoById = exports.FindPhotoById = exports.CreatePhotos = void 0;
const prisma_1 = require("../prisma");
const CreatePhotos = (data) => {
    return prisma_1.prisma.photo.createMany({ data });
};
exports.CreatePhotos = CreatePhotos;
const FindPhotoById = (photoId) => {
    return prisma_1.prisma.photo.findUnique({
        where: { Id: photoId },
    });
};
exports.FindPhotoById = FindPhotoById;
const DeletePhotoById = (photoId) => {
    return prisma_1.prisma.photo.delete({
        where: { Id: photoId },
    });
};
exports.DeletePhotoById = DeletePhotoById;
const ResetPrimaryPhotos = (userId, tx) => {
    return tx.photo.updateMany({
        where: { UserId: userId },
        data: { IsPrimary: false },
    });
};
exports.ResetPrimaryPhotos = ResetPrimaryPhotos;
const GetPrimaryByUserId = async (userId) => {
    return prisma_1.prisma.photo.findFirstOrThrow({
        where: {
            UserId: userId,
            IsPrimary: true
        },
        select: {
            Url: true
        }
    });
};
exports.GetPrimaryByUserId = GetPrimaryByUserId;
const SetPrimaryPhotoDb = (photoId, tx) => {
    return tx.photo.update({
        where: { Id: photoId },
        data: { IsPrimary: true },
    });
};
exports.SetPrimaryPhotoDb = SetPrimaryPhotoDb;
const GetUserPhotos = (userId) => {
    return prisma_1.prisma.user.findUnique({
        where: { Id: userId },
        include: {
            Photos: {
                orderBy: { CreatedAt: "asc" },
            },
        },
    });
};
exports.GetUserPhotos = GetUserPhotos;
