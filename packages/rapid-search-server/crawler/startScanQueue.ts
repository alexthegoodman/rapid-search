import { PrismaClient } from "@prisma/client";
import { scanPage } from "./scanPage";

const { workerData } = require("worker_threads");

const prisma = new PrismaClient();

export const startScanQueue = async () => {
  console.info("workerData", workerData, parseInt(workerData.workerId) - 1);
  const skipItems = (workerData.workerId - 1) * 100;

  console.info("startScanQueue", skipItems);

  let queueItems = await prisma.queue.findMany({
    where: {
      analyzedDate: {
        equals: null,
      },
    },
    skip: skipItems,
    take: 100,
  });

  if (queueItems.length === 0) {
    queueItems = workerData.initialUrls;

    if (workerData.workerId > 1) {
      // cancel all workers when first seeding db
      return;
    }
  }

  console.info("startScanQueue queueItems", queueItems);

  let currentItem = 0;
  const pageScanner = () =>
    new Promise(async (resolve, reject) => {
      const queueItem = queueItems[currentItem];
      const finished = async () => {
        currentItem++;

        if (currentItem < queueItems.length) {
          console.info(
            "finished",
            queueItem.url,
            currentItem,
            workerData.workerId
          );

          pageScanner();
          resolve(true);
        }
      };

      scanPage(queueItem, finished);
    });

  pageScanner();
};

startScanQueue();