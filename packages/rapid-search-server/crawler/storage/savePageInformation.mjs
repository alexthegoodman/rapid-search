import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";
import slugify from "slugify";

import { normalizeText } from "./normalizeText.mjs";
import { parentPort } from "worker_threads";

const prisma = new PrismaClient();

export const savePageInformation = async (
  urlData,
  title,
  description,
  headline,
  excerpt,
  topic,
  topicRating,
  loadSpeed,
  summary,
  keywords
) => {
  try {
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
        loadSpeedScore: loadSpeed,
        topicClassification: {
          connect: {
            generatedInterestSlug: slugify(topic),
          },
        },
        topicScore: topicRating,
        metaTitle: title,
        metaDescription: description,
        headline,
        excerpt,
        summary,
        metaTitleNormal: normalizeText(title),
        metaDescriptionNormal: normalizeText(description),
        headlineNormal: normalizeText(headline),
        excerptNormal: normalizeText(excerpt),
        summaryNormal: normalizeText(summary),
        keywords,
        lastAnalyzedDate: DateTime.now().toISO(),
      },
    });
  } catch (error) {
    console.error(error.message);
    parentPort.postMessage("workerFinished");
    process.exit(2);
  }
};
