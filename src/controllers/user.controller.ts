import { Request, Response } from "express";
import { AppError, BadRequestError, NotFoundError } from "../exceptions/custom.exceptions";
import { GetUserByIdAsync } from "../Services/user.service";
import { SaveUserPhoto } from "../Services/photo.service";
import { prisma } from "../prisma";
import logger from "../utils/logger";
import { GetUserFullProfileService, GetUserSimpleProfileService } from "../Services/profile.service";



export const GetUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await GetUserByIdAsync(id);

        return res.status(200).json(user);
    } catch (err) {
        if (err instanceof NotFoundError) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};


export const UploadPhotoController = async (req: Request, res: Response) => {
    const file = req.file;
    const userId = (req as any).user?.id;

    console.log(req.file);
    console.log(req.body);
    if (!file) {
        return res.status(400).json({ message: "File is required" });
    }

    const url = await SaveUserPhoto(file, userId);

    await prisma.photo.create({
        data: {
            UserId: userId,
            Url: url,
        },
    });

    res.json({ url });
};


export const GetMyPhotosController = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
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


export const GetMyPhotosWithPrimaryController = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const photos = await prisma.photo.findMany({
        where: { UserId: userId },
        orderBy: { CreatedAt: "asc" },
    });

    const primary = photos.find((p: { IsPrimary: any; }) => p.IsPrimary);

    res.json({
        primary,
        photos,
    });
};


export const GetMyPrimaryPhotoController = async (req: Request, res: Response) => {
    const userId = req.user?.id;

    const photo = await prisma.photo.findFirst({
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


// export const GetUserPhotosController = async (req: Request, res: Response) => {
//     const userId = req.params.userId;

//     const photos = await prisma.photo.findMany({
//         where: { UserId: userId },
//         orderBy: { CreatedAt: "asc" },
//     });

//     res.json(photos);
// };


export const GetUserSimpleProfileAsync = async (req:Request, res: Response) =>
{
    const profileId = req.body;
    try
    {
        const usr = await GetUserSimpleProfileService(profileId);
        return res.status(200).json(usr);
    }catch(e)
    {
        if(e instanceof AppError)
        {
            logger.error(`Failed to get profile: ${e.message}`);
            return res.status(e.statusCode).json(e.message);
        }
    }
}

export const GetUserFullProfileAsync = async(req:Request, res:Response)=>
{
    const userId = (res as any).user?.id;
    const {profileId} = req.params;
    if(!profileId)
    {
        throw new BadRequestError("Wrong address");
        return res.status(404).json({message: "Need userId to get profile"})
    }
    const userProfileResponse = await GetUserFullProfileService(String(profileId));
    return res.status(200).json(userProfileResponse);
}