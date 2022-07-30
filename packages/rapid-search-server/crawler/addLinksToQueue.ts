import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addLinksToQueue = async (pageLinksData: URL[]) => {
  const saveData = pageLinksData.map((urlData) => {
    return {
      url: urlData.href,
    };
  });

  await prisma.queue.createMany({
    data: saveData,
  });
};
