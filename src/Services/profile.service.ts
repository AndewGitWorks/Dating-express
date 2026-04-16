import { GetFullUserProfileDto, GetUserSimpleProfileDto } from "../DTOs/profile.dto";
import { AppError, NotFoundError } from "../exceptions/custom.exceptions";
import { AddExtraInterestsToUserRepository, AddInterestsToUserRepository, GetInterestsByNames } from "../repository/interests.repository";
import { AddExtraMusicToUserRepository, AddMusicToUserRepository, GetMusicByName } from "../repository/music.repository";
import { GetPrimaryByUserId } from "../repository/photo.repository";
import { getUserFullProfile, GetUserSimpleProfile, ProfilePrismaAddBio } from "../repository/profile.repository";
import { PromptPrismaCreate } from "../repository/prompt.repository";
import { UserPrismaFindUnique } from "../repository/user.repository";


export async function AddInterestsToUserService(
    userId: string,
    interests: string[]
) {
    const dbInterests = await GetInterestsByNames(interests);

    if (dbInterests.length === 0) {
        throw new NotFoundError("No valid interests found");
    }

    await AddInterestsToUserRepository(userId, dbInterests);
}


export async function AddExtraInterestsToUserService(
    userId: string,
    extra_interest: string
) {
    await AddExtraInterestsToUserRepository(userId, extra_interest);
}


export async function AddMusicToUserService(
    userId: string,
    music: string[],
) {
    const dbMusic = await GetMusicByName(music);

    if (dbMusic.length === 0) {
        throw new NotFoundError("No valid interests found");
    }

    await AddMusicToUserRepository(userId, dbMusic);
}


export async function AddExtraMusicToUserService(
    userId: string,
    extra_interest: string
) {
    await AddExtraMusicToUserRepository(userId, extra_interest);
}


export async function CreatePromptService(
    userId: string, text: string
) {
    const result = await PromptPrismaCreate(userId, text);
    if(!result)
    {
        throw new AppError("Invalid server while creating prompt");
    }
    return result;
}


export async function AddBioService(
    userId: string,
    bio: string
) {
    const result = await ProfilePrismaAddBio(userId, bio);
    if(!result)
    {
        throw new AppError("Internal server error");
    }
    return result;
}



export async function GetUserSimpleProfileService(profileId: string)
{
    const response = await GetUserSimpleProfile(profileId);
    const photo = await GetPrimaryByUserId(profileId);
    if(!response)
    {
        throw new AppError("Cannot get user data");
    }
    if(!photo)
    {
        throw new AppError("Cannot get primary photo");
    }
    const res: GetUserSimpleProfileDto = {
        name: response.Name,
        age: response.Age,
        avatar: photo.Url,
    }
    return res;
}

export async function GetUserFullProfileService(profileId: string) {
    const profile = await getUserFullProfile(profileId);

    const response: GetFullUserProfileDto = {
        name: profile.Name ?? undefined,
        age: profile.Age ?? null,
        city: profile.City?.Name ?? undefined,

        photo_urls: profile.Photos?.map(p => p.Url),

        bio: profile.Profile?.Bio ?? undefined,
        interests_extra: profile.Profile?.InterestsExtra ?? undefined,
        music_extra: profile.Profile?.MusicExtra ?? undefined,

        interests: profile.Interests?.map(i => i.Interest.Name),
        music: profile.Music?.map(m => m.Music.Name),
    };

    return response;
}