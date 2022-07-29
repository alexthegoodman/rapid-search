/*
  Warnings:

  - Added the required column `analyzedDate` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "lastAnalyzedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "analyzedDate" TIMESTAMP(3) NOT NULL;
