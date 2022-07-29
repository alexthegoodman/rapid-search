import got from "got";
import * as cheerio from "cheerio";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const testUrls = [
  "https://en.wikipedia.org/wiki/List_of_hobbies",
  "https://dmitripavlutin.com/parse-url-javascript/",
];

export const scanPage = async () => {
  const pageUrl = testUrls[1];
  const pageUrlData = new URL(pageUrl);

  console.info("pageUrl", pageUrl, pageUrlData.origin);

  const pageHtml = await got.get(pageUrl);
  const $ = cheerio.load(pageHtml.body);

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
        console.info("pass link", linkData, linkData.pathname);
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
