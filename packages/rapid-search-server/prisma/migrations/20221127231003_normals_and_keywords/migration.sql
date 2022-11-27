-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "excerptNormal" TEXT,
ADD COLUMN     "headlineNormal" TEXT,
ADD COLUMN     "keywords" JSONB,
ADD COLUMN     "metaDescriptionNormal" TEXT,
ADD COLUMN     "metaTitleNormal" TEXT,
ADD COLUMN     "summaryNormal" TEXT;
