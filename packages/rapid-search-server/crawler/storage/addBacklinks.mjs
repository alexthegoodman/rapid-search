import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addBacklinks = async (pageUrlData, pageLinksData) => {
  pageLinksData.forEach(async (urlData) => {
    const domain = urlData.hostname;

    await prisma.backlink.create({
      data: {
        originUrl: pageUrlData.toString(),
        originDomain: {
          connectOrCreate: {
            where: {
              content: pageUrlData.hostname,
            },
            create: {
              content: pageUrlData.hostname,
            },
          },
        },
        targetUrl: urlData.toString(),
        targetDomain: {
          connectOrCreate: {
            where: {
              content: domain,
            },
            create: {
              content: domain,
            },
          },
        },
      },
    });
  });
};
