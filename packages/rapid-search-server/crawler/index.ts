import got from "got";
import * as cheerio from "cheerio";
import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";
import { startScanWorkers } from "./scanner/startScanWorkers";

const prisma = new PrismaClient();

export const startCrawler = () => {
  const initialUrls = [
    {
      id: null,
      targetUrl: "https://www.producthunt.com",
    },
    {
      id: null,
      targetUrl: "https://en.wikipedia.org/wiki/Video_game",
    },
    {
      id: null,
      targetUrl: "https://www.ign.com",
    },
  ];

  const result = startScanWorkers(initialUrls);

  console.info("crawl result", result);
};
