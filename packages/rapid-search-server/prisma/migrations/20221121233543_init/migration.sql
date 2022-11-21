-- CreateTable
CREATE TABLE "Backlink" (
    "id" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "targetDomainId" TEXT NOT NULL,
    "originUrl" TEXT NOT NULL,
    "originDomainId" TEXT NOT NULL,
    "analyzedDate" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Backlink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Domain" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "headline" TEXT,
    "excerpt" TEXT,
    "loadSpeedScore" TEXT NOT NULL,
    "topicClassificationId" TEXT NOT NULL,
    "topicScore" TEXT NOT NULL,
    "lastAnalyzedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "generatedInterestSlug" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "generatedCategorySlug" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToInterest" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Backlink_id_key" ON "Backlink"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Domain_id_key" ON "Domain"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Domain_content_key" ON "Domain"("content");

-- CreateIndex
CREATE UNIQUE INDEX "Page_id_key" ON "Page"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Page_url_key" ON "Page"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_id_key" ON "Interest"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Interest_generatedInterestSlug_key" ON "Interest"("generatedInterestSlug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_generatedCategorySlug_key" ON "Category"("generatedCategorySlug");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToInterest_AB_unique" ON "_CategoryToInterest"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToInterest_B_index" ON "_CategoryToInterest"("B");

-- AddForeignKey
ALTER TABLE "Backlink" ADD CONSTRAINT "Backlink_targetDomainId_fkey" FOREIGN KEY ("targetDomainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Backlink" ADD CONSTRAINT "Backlink_originDomainId_fkey" FOREIGN KEY ("originDomainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_topicClassificationId_fkey" FOREIGN KEY ("topicClassificationId") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToInterest" ADD CONSTRAINT "_CategoryToInterest_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToInterest" ADD CONSTRAINT "_CategoryToInterest_B_fkey" FOREIGN KEY ("B") REFERENCES "Interest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
