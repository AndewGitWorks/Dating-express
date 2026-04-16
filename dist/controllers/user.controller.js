"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserSimpleProfileAsync = exports.GetMyPrimaryPhotoController = exports.GetMyPhotosWithPrimaryController = exports.GetMyPhotosController = exports.UploadPhotoController = exports.GetUserById = void 0;
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
const user_service_1 = require("../services/user.service");
const photo_service_1 = require("../services/photo.service");
const prisma_1 = require("../prisma");
const logger_1 = __importDefault(require("../utils/logger"));
const profile_service_1 = require("../services/profile.service");
const GetUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.GetUserByIdAsync)(id);
        return res.status(200).json(user);
    }
    catch (err) {
        if (err instanceof custom_exceptions_1.NotFoundError) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.GetUserById = GetUserById;
const UploadPhotoController = async (req, res) => {
    const file = req.file;
    const userId = req.user?.id;
    if (!file) {
        return res.status(400).json({ message: "File is required" });
    }
    const url = await (0, photo_service_1.SaveUserPhoto)(file, userId);
    await prisma_1.prisma.photo.create({
        data: {
            UserId: userId,
            Url: url,
        },
    });
    res.json({ url });
};
exports.UploadPhotoController = UploadPhotoController;
const GetMyPhotosController = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await prisma_1.prisma.user.findUnique({
        where: { Id: userId },
        select: {
            Photos: {
                orderBy: { CreatedAt: "asc" },
            },
        },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user.Photos);
};
exports.GetMyPhotosController = GetMyPhotosController;
const GetMyPhotosWithPrimaryController = async (req, res) => {
    const userId = req.user?.id;
    const photos = await prisma_1.prisma.photo.findMany({
        where: { UserId: userId },
        orderBy: { CreatedAt: "asc" },
    });
    const primary = photos.find(p => p.IsPrimary);
    res.json({
        primary,
        photos,
    });
};
exports.GetMyPhotosWithPrimaryController = GetMyPhotosWithPrimaryController;
const GetMyPrimaryPhotoController = async (req, res) => {
    const userId = req.user?.id;
    const photo = await prisma_1.prisma.photo.findFirst({
        where: {
            UserId: userId,
            IsPrimary: true,
        },
    });
    if (!photo) {
        return res.status(404).json({ message: "No primary photo" });
    }
    res.json(photo);
};
exports.GetMyPrimaryPhotoController = GetMyPrimaryPhotoController;
// export const GetUserPhotosController = async (req: Request, res: Response) => {
//     const userId = req.params.userId;
//     const photos = await prisma.photo.findMany({
//         where: { UserId: userId },
//         orderBy: { CreatedAt: "asc" },
//     });
//     res.json(photos);
// };
const GetUserSimpleProfileAsync = async (req, res) => {
    const profileId = req.body;
    try {
        const usr = await (0, profile_service_1.GetUserSimpleProfileService)(profileId);
        return res.status(200).json(usr);
    }
    catch (e) {
        if (e instanceof custom_exceptions_1.AppError) {
            logger_1.default.error(`Failed to get profile: ${e.message}`);
            return res.status(e.statusCode).json(e.message);
        }
    }
};
exports.GetUserSimpleProfileAsync = GetUserSimpleProfileAsync;
