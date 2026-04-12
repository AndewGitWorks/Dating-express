import { NOTFOUND } from "dns/promises";
import { prisma } from "../prisma";


export interface CreateUserDto
{
    telegramId: string,
    telegramName: string,
    name: string,
    gender: string,
    age: number,
    city: string,
}
export interface UpdateUserDto
{
    name:string,
    gender: string,
    age: number,
    city: string
}

export interface GetUserResponse
{
    name: string,
    gender: string,
    age: number | null,
    city: string | undefined,
}