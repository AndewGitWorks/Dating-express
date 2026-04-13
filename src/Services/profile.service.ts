import { AppError, NotFoundError } from "../exceptions/custom.exceptions";
import { AddExtraInterestsToUserRepository, AddInterestsToUserRepository, GetInterestsByNames } from "../repository/interests.repository";
import { AddExtraMusicToUserRepository, AddMusicToUserRepository, GetMusicByName } from "../repository/music.repository";
import { ProfilePrismaAddBio } from "../repository/profile.repository";
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
)
{
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
)
{
    await AddExtraMusicToUserRepository(userId, extra_interest);
}


export async function CreatePromptService(
    userId: string, text: string
)
{
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
)
{
    const result = await ProfilePrismaAddBio(userId, bio);
    if(!result)
    {
        throw new AppError("Internal server error");
    }
    return result;
}