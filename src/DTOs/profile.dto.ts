import { Url } from "url";

export interface WorkAndGraduation {
    graduation: string,
    faculty: string,
    job: string,
    department: string,
}
// export interface InterestsResponse
// {
//     id:
// }


export interface GetUserSimpleProfileDto
{
    name: string,
    age: number | null,
    avatar: string | null,
}


export interface GetFullUserProfileDto
{
    name: string | undefined,
    age: number | null,
    city: string | undefined,
    photo_urls: string[] | undefined,
    bio: string | undefined,
    interests_extra: string | undefined,
    music_extra: string | undefined,
    interests: string[] | undefined,
    music: string[] | undefined,
}