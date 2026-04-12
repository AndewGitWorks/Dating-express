import { NotFoundError } from "../exceptions/custom.exceptions";
import { AddExtraInterestsToUserRepository, AddInterestsToUserRepository, GetInterestsByNames } from "../repository/interests.repository";
import { AddExtraMusicToUserRepository, AddMusicToUserRepository, GetMusicByName } from "../repository/music.repository";


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

function GetMusicByNames(interests: string[]) {
    throw new Error("Function not implemented.");
}
