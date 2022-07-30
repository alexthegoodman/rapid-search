-- CreateTable
CREATE TABLE "Query" (
    "id" TEXT NOT NULL,
    "noramlText" TEXT NOT NULL,
    "volume" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Query_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Query_id_key" ON "Query"("id");
