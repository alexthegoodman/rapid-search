import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

import { normalizeText } from "./normalizeText";

const prisma = new PrismaClient();

export const savePageInformation = async (
  urlData: URL,
  title: string | null,
  description: string | null,
  header1: string | null,
  copy1: string | null
) => {
  const normalTitle = normalizeText(title);
  const normalDescription = normalizeText(description);

  await prisma.page.create({
    data: {
      url: urlData.href,
      domain: {
        connectOrCreate: {
          where: {
            content: "",
          },
          create: {
            content: "",
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
