/*
  Warnings:

  - You are about to drop the column `Interests_extra` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `Location` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `Music_extra` on the `profiles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_profile_location";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "Interests_extra",
DROP COLUMN "Location",
DROP COLUMN "Music_extra",
ADD COLUMN     "CityId" UUID,
ADD COLUMN     "InterestsExtra" TEXT,
ADD COLUMN     "MusicExtra" TEXT;

-- CreateTable
CREATE TABLE "cities" (
    "Id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "Name" VARCHAR(255) NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cities_Name_key" ON "cities"("Name");

-- CreateIndex
CREATE INDEX "idx_city_name" ON "cities"("Name");

-- CreateIndex
CREATE INDEX "idx_profile_city_id" ON "profiles"("CityId");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_CityId_fkey" FOREIGN KEY ("CityId") REFERENCES "cities"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
