"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInterestsToUserService = AddInterestsToUserService;
exports.AddExtraInterestsToUserService = AddExtraInterestsToUserService;
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
const interests_repository_1 = require("../repository/interests.repository");
async function AddInterestsToUserService(userId, interests) {
    const dbInterests = await (0, interests_repository_1.GetInterestsByNames)(interests);
    if (dbInterests.length === 0) {
        throw new custom_exceptions_1.NotFoundError("No valid interests found");
    }
    await (0, interests_repository_1.AddInterestsToUserRepository)(userId, dbInterests);
}
async function AddExtraInterestsToUserService(userId, extra_interest) {
    await (0, interests_repository_1.AddExtraInterestsToUserRepository)(userId, extra_interest);
}
