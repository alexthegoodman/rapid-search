import got from "got";
import * as cheerio from "cheerio";
import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

/**
 * startScanQueue - get unfinished items from database queue, promise-loop through each item
 * scanPage - check if link has been analyzed before, updates queue and creates link in database,
 * parse workable page links and add to queue
 */

export const startScanQueue = async (initialUrls) => {
  let queueItems = await prisma.queue.findMany({
    where: {
      analyzedDate: {
        equals: null,
      },
    },
  });

  if (queueItems.length === 0) {
    queueItems = initialUrls;
  }

  console.info("queueItems", queueItems);

  let currentItem = 0;
  const pageScanner = () =>
    new Promise(async (resolve, reject) => {
      const queueItem = queueItems[currentItem];
      const finished = async () => {
        currentItem++;

        console.info("finished", queueItem.url, currentItem);

        pageScanner();
        resolve(true);
      };

      scanPage(queueItem, finished);
    });

  pageScanner();
};

const scanPage = async (queueItem, finished) => {
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
  }
};

const savePageInformation = async (
  urlData: URL,
  title: string,
  description: string,
  tags: string,
  header1: string,
  copy1: string
) => {
  await prisma.link.create({
    data: {
      url: urlData.href,
      title,
      description,
      tags,
      header1,
      copy1,
      lastAnalyzedDate: DateTime.now().toISO(),
    },
  });
};

const addLinksToQueue = async (pageLinksData: URL[]) => {
  const saveData = pageLinksData.map((urlData) => {
    return {
      url: urlData.href,
    };
  });

  await prisma.queue.createMany({
    data: saveData,
  });
};

const extractPageLinks = ($, origin) => {
  const allPageLinks = $(`a`);

  const pageLinksData: URL[] = [];
  Array.from(allPageLinks).forEach((link, x) => {
    const { href } = link.attribs;

    try {
      const linkData = new URL(href, origin);
      // TODO: do not add links starting with ? (query) or # (hash)
      let allow = true;
      if (href !== "/" && linkData.pathname === "/") allow = false;
      if (linkData.origin === "null") allow = false;
      if (linkData.hash !== "") allow = false; // do not add links with hash
      if (linkData.search !== "") allow = false; // do not add links w/query strings
      //   if (linkData.pathname === "") allow = false;

      if (allow) {
        const nextIndex = pageLinksData.length;
        console.info("pass link", linkData.pathname);
        pageLinksData[nextIndex] = linkData;
      }
    } catch (error) {
      // invalid url
      console.error("error", href, error);
    }
  });

  return pageLinksData;
};

const extractPageInformation = ($) => {
  const titleElement = $("title")[0];
  const descriptionElement = $(`meta[name="description"]`)[0];
  const tagsElement = $(`meta[name="tags"]`)[0];

  const headerElement = $(`h1`)[0];
  const firstCopyElement = $(`p`)[0];

  // NOTE: some web pages have no meta tags set
  const titleContent =
    typeof titleElement !== "undefined" && titleElement.children.length
      ? titleElement.children[0]["data"]
      : null;
  const descriptionContent =
    typeof descriptionElement !== "undefined" && descriptionElement.attribs
      ? descriptionElement.attribs.content
      : null;
  const tagsContent =
    typeof tagsElement !== "undefined" && tagsElement.attribs
      ? tagsElement.attribs.content
      : null;

  const headerContent =
    typeof headerElement !== "undefined" && headerElement.children.length
      ? headerElement.children[0]["data"]
      : null;
  const firstCopyContent =
    typeof firstCopyElement !== "undefined" && firstCopyElement.children.length
      ? firstCopyElement.children[0]["data"]
      : null;

  console.info(
    "titleContent",
    titleContent,
    "descriptionContent",
    descriptionContent,
    "tagsContent",
    tagsContent,
    "headerContent",
    headerContent,
    "firstCopyContent",
    firstCopyContent
  );

  return {
    titleContent,
    descriptionContent,
    tagsContent,
    headerContent,
    firstCopyContent,
  };
};
