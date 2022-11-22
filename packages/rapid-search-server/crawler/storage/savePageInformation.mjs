import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

import { normalizeText } from "./normalizeText.mjs";

const prisma = new PrismaClient();

export const savePageInformation = async (
  urlData,
  title,
  description,
  header1,
  copy1
) => {
  await prisma.page.create({
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
          id: "",
        },
      },
      topicScore: "",
      metaTitle: title,
      metaDescription: description,
      headline: header1,
      excerpt: copy1,
      lastAnalyzedDate: DateTime.now().toISO(),
    },
  });
};
