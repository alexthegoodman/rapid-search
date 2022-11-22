import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

import { normalizeText } from "./normalizeText.mjs";

const prisma = new PrismaClient();

export const savePageInformation = async (
  urlData,
  title,
  description,
  headline,
  excerpt
) => {
  console.info("urlData.hostname", urlData.hostname);
  return await prisma.page.create({
    data: {
      url: urlData.href,
      domain: {
        connectOrCreate: {
          where: {
            content: urlData.hostname,
          },
          create: {
            content: urlData.hostname,
          },
        },
      },
      loadSpeedScore: "",
      topicClassification: {
        connect: {
          generatedInterestSlug: "Beer-Tasting",
        },
      },
      topicScore: "",
      metaTitle: title,
      metaDescription: description,
      headline,
      excerpt,
      lastAnalyzedDate: DateTime.now().toISO(),
    },
  });
};