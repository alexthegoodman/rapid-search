import { PrismaClient } from "@prisma/client";
import got from "got";
import * as cheerio from "cheerio";
import { DateTime } from "luxon";

import { addBacklinks } from "../storage/addBacklinks.mjs";
import { extractPageInformation } from "../extractor/extractPageInformation.mjs";
import { extractPageLinks } from "../extractor/extractPageLinks.mjs";
import { savePageInformation } from "../storage/savePageInformation.mjs";
import { classifyExcerpt } from "../extractor/classifyExcerpt.mjs";
import { recordLoadSpeed } from "../extractor/recordLoadSpeed.mjs";
import { summarizeText } from "../extractor/summarizeText.mjs";
import kw from "../extractor/extractKeywords.js";
import { extractPageMedia } from "../extractor/extractPageMedia.mjs";

const prisma = new PrismaClient();

export const scanPage = async (queueItem, finished) => {
  const pageUrl = queueItem.targetUrl;
  const pageUrlData = new URL(pageUrl);

  console.info("pageUrl", pageUrl, pageUrlData.origin);

  if (queueItem.id) {
    await prisma.backlink.update({
      where: {
        id: queueItem.id,
      },
      data: {
        analyzedDate: DateTime.now().toISO(),
      },
    });
  }

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
  const links = await prisma.page.findMany({
    where: {
      url: pageUrl,
    },
  });

  let allowPageAnalysis = true;
  if (links.length > 0) allowPageAnalysis = false;

  if (allowPageAnalysis) {
    const { titleContent, descriptionContent, headlineText, excerpt, body } =
      extractPageInformation($);

    const { loadSpeed } = await recordLoadSpeed(pageUrl); //2s

    const { keywords } = await kw.extractKeywords(body);

    const { onlyMedia } = extractPageMedia($, pageUrlData.origin);

    const { summary } = await summarizeText(body); //10s?

    const { topic, topicRating } = await classifyExcerpt(summary); //20s on ma

    await savePageInformation(
      pageUrlData,
      titleContent,
      descriptionContent,
      headlineText,
      excerpt,
      topic,
      topicRating,
      loadSpeed,
      summary,
      keywords,
      onlyMedia
    );

    const pageLinksData = extractPageLinks($, pageUrlData.origin);

    addBacklinks(pageUrlData, pageLinksData);

    finished();
  } else {
    console.info("Page already analyzed");
    finished();
  }
};
