/*
  Warnings:

  - You are about to drop the column `movieId` on the `Favorite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,tmdbId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mediaType` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tmdbId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Favorite_userId_movieId_key";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "movieId",
ADD COLUMN     "mediaType" TEXT NOT NULL,
ADD COLUMN     "tmdbId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_tmdbId_key" ON "Favorite"("userId", "tmdbId");
