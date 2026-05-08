"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddInterestsToUserService = AddInterestsToUserService;
exports.AddExtraInterestsToUserService = AddExtraInterestsToUserService;
exports.AddMusicToUserService = AddMusicToUserService;
exports.AddExtraMusicToUserService = AddExtraMusicToUserService;
exports.CreatePromptService = CreatePromptService;
exports.AddBioService = AddBioService;
exports.GetUserSimpleProfileService = GetUserSimpleProfileService;
exports.GetUserFullProfileService = GetUserFullProfileService;
const custom_exceptions_1 = require("../exceptions/custom.exceptions");
const interests_repository_1 = require("../repository/interests.repository");
const music_repository_1 = require("../repository/music.repository");
const photo_repository_1 = require("../repository/photo.repository");
const profile_repository_1 = require("../repository/profile.repository");
const prompt_repository_1 = require("../repository/prompt.repository");
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
async function AddMusicToUserService(userId, music) {
    const dbMusic = await (0, music_repository_1.GetMusicByName)(music);
    if (dbMusic.length === 0) {
        throw new custom_exceptions_1.NotFoundError("No valid interests found");
    }
    await (0, music_repository_1.AddMusicToUserRepository)(userId, dbMusic);
}
async function AddExtraMusicToUserService(userId, extra_interest) {
    await (0, music_repository_1.AddExtraMusicToUserRepository)(userId, extra_interest);
}
async function CreatePromptService(userId, text) {
    const result = await (0, prompt_repository_1.PromptPrismaCreate)(userId, text);
    if (!result) {
        throw new custom_exceptions_1.AppError("Invalid server while creating prompt");
    }
    return result;
}
async function AddBioService(userId, bio) {
    const result = await (0, profile_repository_1.ProfilePrismaAddBio)(userId, bio);
    if (!result) {
        throw new custom_exceptions_1.AppError("Internal server error");
    }
    return result;
}
async function GetUserSimpleProfileService(profileId) {
    const response = await (0, profile_repository_1.GetUserSimpleProfile)(profileId);
    const photo = await (0, photo_repository_1.GetPrimaryByUserId)(profileId);
    if (!response) {
        throw new custom_exceptions_1.AppError("Cannot get user data");
    }
    if (!photo) {
        throw new custom_exceptions_1.AppError("Cannot get primary photo");
    }
    const res = {
        name: response.Name,
        age: response.Age,
        avatar: photo.Url,
    };
    return res;
}
async function GetUserFullProfileService(profileId) {
    const profile = await (0, profile_repository_1.getUserFullProfile)(profileId);
    const response = {
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
