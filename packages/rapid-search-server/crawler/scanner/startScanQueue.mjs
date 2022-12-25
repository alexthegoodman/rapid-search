import { PrismaClient } from "@prisma/client";
import { scanPage } from "./scanPage.mjs";

// const { workerData } = require("worker_threads");
import { workerData, parentPort } from "worker_threads";

const prisma = new PrismaClient();

export const startScanQueue = async () => {
  // console.info("workerData", workerData, parseInt(workerData.workerId) - 1);
  const skipItems = (workerData.workerId - 1) * 100;

  console.info("startScanQueue", skipItems);

  let queueItems = await prisma.backlink.findMany({
    where: {
      analyzedDate: {
        equals: null,
      },
    },
    skip: skipItems,
    take: 100,
    orderBy: {
      createdAt: "asc",
    },
  });

  console.info("Backlinks collected...")

  if (queueItems.length === 0 && skipItems === 0) {
    queueItems = workerData.initialUrls;
  }
  if (queueItems.length === 0 && workerData.workerId > 1) {
    // cancel all workers when first seeding db
    return;
  }

  // console.info("startScanQueue queueItems", queueItems);
  console.info("Create pagescanner")
  
  var currentItem = 0;
  const pageScanner = () =>
    new Promise(async (resolve, reject) => {
      const queueItem = queueItems[currentItem];
      const finished = async () => {
        currentItem++;

        if (currentItem < queueItems.length) {
          console.info(
            "-------- finished",
            workerData.workerId,
            queueItem.targetUrl,
            currentItem,
            workerData.workerId
          );

          pageScanner();
          resolve(true);
        } else {
          console.info("workerFinished");
          parentPort.postMessage("workerFinished");
        }
      };

      const scanDelay = process.env.NODE_ENV === "production" ? 0 : 500;

      console.info("-------- start", workerData.workerId);
      console.info("ScanPage (delay)", queueItem.targetUrl, scanDelay);

      setTimeout(() => {
        scanPage(queueItem, finished);
      }, scanDelay);
    });

  if (queueItems.length > 0) {
    pageScanner();
  }
};

startScanQueue();
