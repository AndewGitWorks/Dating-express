import { NotFoundError } from "../exceptions/custom.exceptions";
import { AddExtraInterestsToUserRepository, AddInterestsToUserRepository, GetInterestsByNames } from "../repository/interests.repository";


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