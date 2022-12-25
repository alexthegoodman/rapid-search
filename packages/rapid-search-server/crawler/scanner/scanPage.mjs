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

  console.info("Get page html...")

  let pageHtml = null;
  try {
    pageHtml = await got.get(pageUrl, { timeout: 10000 });
  } catch (error) {
    console.error("pageHtml error", error);
  }

  if (pageHtml === null) {
    console.info("no html finished")
    finished();
    return;
  }

  console.info("Load cheerio")

  const $ = cheerio.load(pageHtml.body);

  console.info("Load links")

  // TODO: Check if url exists in Links
  const links = await prisma.page.findMany({
    where: {
      url: pageUrl,
    },
  });

  console.info("Begin analysis...")

  let allowPageAnalysis = true;
  if (links.length > 0) allowPageAnalysis = false;

  if (allowPageAnalysis) {
    const { titleContent, descriptionContent, headlineText, excerpt, body } =
      extractPageInformation($);

    const { loadSpeed } = await recordLoadSpeed(pageUrl); //2s

    const { keywords } = await kw.extractKeywords(body);

    console.info("Extract media")

    const { onlyMedia } = extractPageMedia($, pageUrlData.origin);

    console.info("Summarize text")

    const { summary } = await summarizeText(body); //10s?

    console.info("Save information")

    // const { topic, topicRating } = await classifyExcerpt(summary); //20s on ma
    const topic = null;
    const topicRating = null;

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
