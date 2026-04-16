"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePhoto = exports.SetPrimaryPhoto = void 0;
exports.SaveUserPhoto = SaveUserPhoto;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma_1 = require("../prisma");
const photo_repository_1 = require("../repository/photo.repository");
async function SaveUserPhoto(file, userId) {
    if (!file.mimetype.startsWith("image/")) {
        throw new Error("Invalid file type");
    }
    const fileName = `user-${userId}-${Date.now()}.webp`;
    const filePath = path_1.default.join(__dirname, "../../uploads", fileName);
    await (0, sharp_1.default)(file.buffer)
        .resize(800, 800, { fit: "cover" })
        .webp({ quality: 80 })
        .toFile(filePath);
    return `/uploads/${fileName}`;
}
const SetPrimaryPhoto = async (userId, photoId) => {
    return prisma_1.prisma.$transaction(async (tx) => {
        await (0, photo_repository_1.ResetPrimaryPhotos)(userId, tx);
        return (0, photo_repository_1.SetPrimaryPhotoDb)(photoId, tx);
    });
};
exports.SetPrimaryPhoto = SetPrimaryPhoto;
const DeletePhoto = async (photoId, userId) => {
    const photo = await (0, photo_repository_1.FindPhotoById)(photoId);
    if (!photo || photo.UserId !== userId) {
        throw new Error("Photo not found");
    }
    const fullPath = path_1.default.join(__dirname, "../../", photo.Url);
    fs_1.default.unlinkSync(fullPath);
    await (0, photo_repository_1.DeletePhotoById)(photoId);
};
exports.DeletePhoto = DeletePhoto;
