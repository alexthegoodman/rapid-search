import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addBacklinks = async (pageUrlData, pageLinksData) => {
  for (const urlData of pageLinksData) {
    const originDomain = pageUrlData.hostname;
    const targetDomain = urlData.hostname;
    const originUrl = pageUrlData.toString();
    const targetUrl = urlData.toString();

    // console.info("add backlink", originUrl, targetUrl);

    await prisma.backlink.create({
      data: {
        originUrl,
        originDomain: {
          connectOrCreate: {
            where: {
              content: originDomain,
            },
            create: {
              content: originDomain,
            },
          },
        },
        targetUrl,
        targetDomain: {
          connectOrCreate: {
            where: {
              content: targetDomain,
            },
            create: {
              content: targetDomain,
            },
          },
        },
      },
    });
  }
};
