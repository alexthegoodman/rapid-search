/*
  Warnings:

  - Changed the type of `loadSpeedScore` on the `Page` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "loadSpeedScore",
ADD COLUMN     "loadSpeedScore" INTEGER NOT NULL;
