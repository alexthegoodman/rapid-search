/*
  Warnings:

  - You are about to drop the column `noramlText` on the `SearchQuery` table. All the data in the column will be lost.
  - Added the required column `normalText` to the `SearchQuery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchQuery" DROP COLUMN "noramlText",
ADD COLUMN     "normalText" TEXT NOT NULL;
