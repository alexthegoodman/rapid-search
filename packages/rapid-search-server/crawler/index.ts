import got from "got";
import * as cheerio from "cheerio";
import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";
import { startScanWorkers } from "./startScanWorkers";

const prisma = new PrismaClient();

/**
 * startScanQueue - get unfinished items from database queue, promise-loop through each item
 * scanPage - check if link has been analyzed before, updates queue and creates link in database,
 * parse workable page links and add to queue
 */

export const startCrawler = () => {
  const initialUrls = [
    { id: null, url: "https://en.wikipedia.org/wiki/List_of_hobbies" },
  ];

  const result = startScanWorkers(initialUrls);

  console.info("crawl result", result);
};
