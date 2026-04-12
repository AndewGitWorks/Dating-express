/*
  Warnings:

  - You are about to drop the column `Gender` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `Gender` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "idx_profile_gender";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "Gender";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "Gender" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE INDEX "idx_profile_gender" ON "users"("Gender");
