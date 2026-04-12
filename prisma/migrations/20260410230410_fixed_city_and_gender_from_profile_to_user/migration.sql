/*
  Warnings:

  - You are about to drop the column `Age` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `CityId` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `Name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_CityId_fkey";

-- DropIndex
DROP INDEX "idx_profile_age";

-- DropIndex
DROP INDEX "idx_profile_city_id";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "Age",
DROP COLUMN "CityId",
DROP COLUMN "Name";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "Age" INTEGER,
ADD COLUMN     "CityId" UUID,
ADD COLUMN     "Name" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE INDEX "idx_profile_age" ON "users"("Age");

-- CreateIndex
CREATE INDEX "idx_profile_city_id" ON "users"("CityId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_CityId_fkey" FOREIGN KEY ("CityId") REFERENCES "cities"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
