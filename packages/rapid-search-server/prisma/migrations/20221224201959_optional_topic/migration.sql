-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_topicClassificationId_fkey";

-- AlterTable
ALTER TABLE "Page" ALTER COLUMN "topicClassificationId" DROP NOT NULL,
ALTER COLUMN "topicScore" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_topicClassificationId_fkey" FOREIGN KEY ("topicClassificationId") REFERENCES "Interest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
