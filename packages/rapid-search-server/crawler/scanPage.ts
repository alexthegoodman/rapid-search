import { PrismaClient } from "@prisma/client";
import got from "got";
import * as cheerio from "cheerio";
import { DateTime } from "luxon";

import { addLinksToQueue } from "./addLinksToQueue";
import { extractPageInformation } from "./extractPageInformation";
import { extractPageLinks } from "./extractPageLinks";
import { savePageInformation } from "./savePageInformation";

const prisma = new PrismaClient();

export const scanPage = async (queueItem: any, finished: () => void) => {
  const pageUrl = queueItem.url;
  const pageUrlData = new URL(pageUrl);

  console.info("pageUrl", pageUrl, pageUrlData.origin);

  let pageHtml = null;
  try {
    pageHtml = await got.get(pageUrl);
  } catch (error) {
    console.error("pageHtml error", error);
  }

  if (pageHtml === null) {
    finished();
    return;
  }

  const $ = cheerio.load(pageHtml.body);

  // TODO: Check if url exists in Links
  const links = await prisma.link.findMany({
    where: {
      url: pageUrl,
    },
  });

  let allowPageAnalysis = true;
  if (links.length > 0) allowPageAnalysis = false;

  if (allowPageAnalysis) {
    if (queueItem.id) {
      await prisma.queue.update({
        where: {
          id: queueItem.id,
        },
        data: {
          analyzedDate: DateTime.now().toISO(),
        },
      });
    }

    const {
      titleContent,
      descriptionContent,
      tagsContent,
      headerContent,
      firstCopyContent,
    } = extractPageInformation($);

    savePageInformation(
      pageUrlData,
      titleContent,
      descriptionContent,
      tagsContent,
      headerContent,
      firstCopyContent
    );

    const pageLinksData = extractPageLinks($, pageUrlData.origin);

    addLinksToQueue(pageLinksData);

    finished();
  } else {
    console.info("Page already analyzed");
    finished();
  }
};
