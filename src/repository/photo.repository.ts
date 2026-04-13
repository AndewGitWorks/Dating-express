import { prisma } from "../prisma";





export const CreatePhotos = (data: any[]) => {
    return prisma.photo.createMany({ data });
};

export const FindPhotoById = (photoId: string) => {
    return prisma.photo.findUnique({
        where: { Id: photoId },
    });
};

export const DeletePhotoById = (photoId: string) => {
    return prisma.photo.delete({
        where: { Id: photoId },
    });
};

export const ResetPrimaryPhotos = (userId: string, tx: any) => {
    return tx.photo.updateMany({
        where: { UserId: userId },
        data: { IsPrimary: false },
    });
};

export const SetPrimaryPhotoDb = (photoId: string, tx: any) => {
    return tx.photo.update({
        where: { Id: photoId },
        data: { IsPrimary: true },
    });
};

export const GetUserPhotos = (userId: string) => {
    return prisma.user.findUnique({
        where: { Id: userId },
        include: {
            Photos: {
                orderBy: { CreatedAt: "asc" },
            },
        },
    });
};