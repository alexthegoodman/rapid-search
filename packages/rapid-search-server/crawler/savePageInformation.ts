import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

import { normalizeText } from "./normalizeText";

const prisma = new PrismaClient();

export const savePageInformation = async (
  urlData: URL,
  title: string | null,
  description: string | null,
  tags: string | null,
  header1: string | null,
  copy1: string | null
) => {
  const normalTitle = normalizeText(title);
  const normalDescription = normalizeText(description);

  await prisma.link.create({
    data: {
      url: urlData.href,
      title,
      description,
      tags,
      header1,
      copy1,

      normalTitle,
      normalDescription,

      lastAnalyzedDate: DateTime.now().toISO(),
    },
  });
};
