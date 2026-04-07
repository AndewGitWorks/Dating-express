/*
  Warnings:

  - The primary key for the `interests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `interests` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `interests` table. All the data in the column will be lost.
  - The primary key for the `user_interests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `interestId` on the `user_interests` table. All the data in the column will be lost.
  - You are about to drop the column `userExtraId` on the `user_interests` table. All the data in the column will be lost.
  - The primary key for the `user_music` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genreId` on the `user_music` table. All the data in the column will be lost.
  - You are about to drop the column `userExtraId` on the `user_music` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `city_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `telegram_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `telegram_username` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_age` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `graduations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `music_genres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_extras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_likes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[Name]` on the table `interests` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[TelegramId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Name` to the `interests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `InterestId` to the `user_interests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `user_interests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MusicId` to the `user_music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserId` to the `user_music` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TelegramId` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_extras" DROP CONSTRAINT "user_extras_graduation_id_fkey";

-- DropForeignKey
ALTER TABLE "user_extras" DROP CONSTRAINT "user_extras_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_interests" DROP CONSTRAINT "user_interests_interestId_fkey";

-- DropForeignKey
ALTER TABLE "user_interests" DROP CONSTRAINT "user_interests_userExtraId_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_liked_id_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_liker_id_fkey";

-- DropForeignKey
ALTER TABLE "user_music" DROP CONSTRAINT "user_music_genreId_fkey";

-- DropForeignKey
ALTER TABLE "user_music" DROP CONSTRAINT "user_music_userExtraId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_city_id_fkey";

-- DropIndex
DROP INDEX "interests_name_key";

-- DropIndex
DROP INDEX "users_telegram_id_key";

-- AlterTable
ALTER TABLE "interests" DROP CONSTRAINT "interests_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN     "Name" VARCHAR(100) NOT NULL,
ADD CONSTRAINT "interests_pkey" PRIMARY KEY ("Id");

-- AlterTable
ALTER TABLE "user_interests" DROP CONSTRAINT "user_interests_pkey",
DROP COLUMN "interestId",
DROP COLUMN "userExtraId",
ADD COLUMN     "InterestId" UUID NOT NULL,
ADD COLUMN     "UserId" UUID NOT NULL,
ADD CONSTRAINT "user_interests_pkey" PRIMARY KEY ("UserId", "InterestId");

-- AlterTable
ALTER TABLE "user_music" DROP CONSTRAINT "user_music_pkey",
DROP COLUMN "genreId",
DROP COLUMN "userExtraId",
ADD COLUMN     "MusicId" UUID NOT NULL,
ADD COLUMN     "UserId" UUID NOT NULL,
ADD CONSTRAINT "user_music_pkey" PRIMARY KEY ("UserId", "MusicId");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "city_id",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "telegram_id",
DROP COLUMN "telegram_username",
DROP COLUMN "user_age",
DROP COLUMN "user_name",
ADD COLUMN     "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD COLUMN     "IsBlocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "IsVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "TelegramId" BIGINT NOT NULL,
ADD COLUMN     "Username" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("Id");

-- DropTable
DROP TABLE "cities";

-- DropTable
DROP TABLE "graduations";

-- DropTable
DROP TABLE "music_genres";

-- DropTable
DROP TABLE "user_extras";

-- DropTable
DROP TABLE "user_likes";

-- CreateTable
CREATE TABLE "profiles" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "UserId" UUID NOT NULL,
    "Name" VARCHAR(100) NOT NULL,
    "Age" INTEGER,
    "Bio" TEXT,
    "Interests" JSONB,
    "Interests_extra" TEXT,
    "Music" JSONB,
    "Music_extra" TEXT,
    "Gender" VARCHAR(20) NOT NULL,
    "Location" VARCHAR(255),

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "photos" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "UserId" UUID NOT NULL,
    "Url" VARCHAR(512) NOT NULL,
    "IsPrimary" BOOLEAN NOT NULL DEFAULT false,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "photos_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "prompts" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "UserId" UUID NOT NULL,
    "Text" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "recommendations" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "PromptId" UUID NOT NULL,
    "TargetUserId" UUID NOT NULL,
    "Score" DOUBLE PRECISION NOT NULL,
    "Explanation" TEXT,

    CONSTRAINT "recommendations_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "music" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "Name" VARCHAR(100) NOT NULL,

    CONSTRAINT "music_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "matches" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "FromUserId" UUID NOT NULL,
    "ToUserId" UUID NOT NULL,
    "Status" VARCHAR(20) NOT NULL DEFAULT 'Pending',
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "reports" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "FromUserId" UUID NOT NULL,
    "TargetUserId" UUID NOT NULL,
    "Reason" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "blocks" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "UserId" UUID NOT NULL,
    "BlockedUserId" UUID NOT NULL,

    CONSTRAINT "blocks_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "UserId" UUID NOT NULL,
    "Type" VARCHAR(50) NOT NULL,
    "ExpirationDate" TIMESTAMP,
    "IsActive" BOOLEAN NOT NULL DEFAULT true,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "UserId" UUID NOT NULL,
    "Type" VARCHAR(50) NOT NULL,
    "Text" TEXT NOT NULL,
    "IsRead" BOOLEAN NOT NULL DEFAULT false,
    "CreatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_UserId_key" ON "profiles"("UserId");

-- CreateIndex
CREATE INDEX "idx_profile_age" ON "profiles"("Age");

-- CreateIndex
CREATE INDEX "idx_profile_gender" ON "profiles"("Gender");

-- CreateIndex
CREATE INDEX "idx_profile_location" ON "profiles"("Location");

-- CreateIndex
CREATE INDEX "idx_photo_user_id" ON "photos"("UserId");

-- CreateIndex
CREATE INDEX "idx_photo_is_primary" ON "photos"("UserId", "IsPrimary");

-- CreateIndex
CREATE INDEX "idx_prompt_user_id" ON "prompts"("UserId");

-- CreateIndex
CREATE INDEX "idx_prompt_created_at" ON "prompts"("CreatedAt");

-- CreateIndex
CREATE INDEX "idx_recommendation_prompt_id" ON "recommendations"("PromptId");

-- CreateIndex
CREATE INDEX "idx_recommendation_target_user_id" ON "recommendations"("TargetUserId");

-- CreateIndex
CREATE INDEX "idx_recommendation_score" ON "recommendations"("Score");

-- CreateIndex
CREATE UNIQUE INDEX "music_Name_key" ON "music"("Name");

-- CreateIndex
CREATE INDEX "idx_music_name" ON "music"("Name");

-- CreateIndex
CREATE INDEX "idx_match_from_user" ON "matches"("FromUserId");

-- CreateIndex
CREATE INDEX "idx_match_to_user" ON "matches"("ToUserId");

-- CreateIndex
CREATE INDEX "idx_match_status" ON "matches"("Status");

-- CreateIndex
CREATE UNIQUE INDEX "matches_FromUserId_ToUserId_key" ON "matches"("FromUserId", "ToUserId");

-- CreateIndex
CREATE INDEX "idx_report_target_user" ON "reports"("TargetUserId");

-- CreateIndex
CREATE INDEX "idx_report_from_user" ON "reports"("FromUserId");

-- CreateIndex
CREATE INDEX "idx_block_user_id" ON "blocks"("UserId");

-- CreateIndex
CREATE INDEX "idx_block_blocked_user_id" ON "blocks"("BlockedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "blocks_UserId_BlockedUserId_key" ON "blocks"("UserId", "BlockedUserId");

-- CreateIndex
CREATE INDEX "idx_subscription_user_id" ON "subscriptions"("UserId");

-- CreateIndex
CREATE INDEX "idx_subscription_expiration_date" ON "subscriptions"("ExpirationDate");

-- CreateIndex
CREATE INDEX "idx_subscription_is_active" ON "subscriptions"("IsActive");

-- CreateIndex
CREATE INDEX "idx_notification_user_id" ON "notifications"("UserId");

-- CreateIndex
CREATE INDEX "idx_notification_is_read" ON "notifications"("IsRead");

-- CreateIndex
CREATE INDEX "idx_notification_created_at" ON "notifications"("CreatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "interests_Name_key" ON "interests"("Name");

-- CreateIndex
CREATE INDEX "idx_interest_name" ON "interests"("Name");

-- CreateIndex
CREATE INDEX "idx_user_interest_user_id" ON "user_interests"("UserId");

-- CreateIndex
CREATE INDEX "idx_user_interest_interest_id" ON "user_interests"("InterestId");

-- CreateIndex
CREATE INDEX "idx_user_music_user_id" ON "user_music"("UserId");

-- CreateIndex
CREATE INDEX "idx_user_music_music_id" ON "user_music"("MusicId");

-- CreateIndex
CREATE UNIQUE INDEX "users_TelegramId_key" ON "users"("TelegramId");

-- CreateIndex
CREATE UNIQUE INDEX "users_Username_key" ON "users"("Username");

-- CreateIndex
CREATE INDEX "idx_user_telegram_id" ON "users"("TelegramId");

-- CreateIndex
CREATE INDEX "idx_user_username" ON "users"("Username");

-- CreateIndex
CREATE INDEX "idx_user_created_at" ON "users"("CreatedAt");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompts" ADD CONSTRAINT "prompts_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_PromptId_fkey" FOREIGN KEY ("PromptId") REFERENCES "prompts"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_TargetUserId_fkey" FOREIGN KEY ("TargetUserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_interests" ADD CONSTRAINT "user_interests_InterestId_fkey" FOREIGN KEY ("InterestId") REFERENCES "interests"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_music" ADD CONSTRAINT "user_music_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_music" ADD CONSTRAINT "user_music_MusicId_fkey" FOREIGN KEY ("MusicId") REFERENCES "music"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_FromUserId_fkey" FOREIGN KEY ("FromUserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_ToUserId_fkey" FOREIGN KEY ("ToUserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_FromUserId_fkey" FOREIGN KEY ("FromUserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_TargetUserId_fkey" FOREIGN KEY ("TargetUserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blocks" ADD CONSTRAINT "blocks_BlockedUserId_fkey" FOREIGN KEY ("BlockedUserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("Id") ON DELETE CASCADE ON UPDATE CASCADE;
