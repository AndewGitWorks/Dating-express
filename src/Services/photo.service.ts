import sharp from "sharp";
import path from "path";
import fs from "fs";
import { prisma } from "../prisma";
import { DeletePhotoById, FindPhotoById, ResetPrimaryPhotos, SetPrimaryPhotoDb } from "../repository/photo.repository";

export async function SaveUserPhoto(
    file: Express.Multer.File,
    userId: string
) {
    if (!file.mimetype.startsWith("image/")) {
        throw new Error("Invalid file type");
    }

    const fileName = `user-${userId}-${Date.now()}.webp`;
    const filePath = path.join(__dirname, "../uploads", fileName);

    await sharp(file.buffer)
        .resize(800, 800, { fit: "cover" })
        .webp({ quality: 80 })
        .toFile(filePath);

    return `/uploads/${fileName}`;
}

export const SetPrimaryPhoto = async (userId: string, photoId: string) => {
    return prisma.$transaction(async (tx) => {
        await ResetPrimaryPhotos(userId, tx);
        return SetPrimaryPhotoDb(photoId, tx);
    });
};


export const DeletePhoto = async (photoId: string, userId: string) => {
    const photo = await FindPhotoById(photoId);

    if (!photo || photo.UserId !== userId) {
        throw new Error("Photo not found");
    }

    const fullPath = path.join(__dirname, "../../", photo.Url);
    fs.unlinkSync(fullPath);

    await DeletePhotoById(photoId);
};