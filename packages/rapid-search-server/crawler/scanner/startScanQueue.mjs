import { PrismaClient } from "@prisma/client";
import { scanPage } from "./scanPage.mjs";

// const { workerData } = require("worker_threads");
import { workerData, parentPort } from "worker_threads";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

export const startScanQueue = async () => {
  // console.info("workerData", workerData, parseInt(workerData.workerId) - 1);
  const skipItems = (workerData.workerId - 1) * 1;

  console.info("startScanQueue", skipItems);

  const targetDomain = await prisma.domain.findFirst({
    where: {
      analyzedDate: {
        equals: null
      }
    },
    skip: skipItems,
    orderBy: {
      createdAt: "asc"
    }
  });

  await prisma.domain.update({
    where: {
      id: targetDomain.id
    },
    data: {
      analyzedDate: DateTime.now().toISO()
    }
  })

  console.info("targetDomain ", targetDomain.content);

  let queueItems = await prisma.backlink.findMany({
    where: {
      targetDomain: {
        id: targetDomain.id
      },
      analyzedDate: {
        equals: null
      }
    },
    take: 10,
    orderBy: {
      createdAt: "asc",
    },
  });

  console.info("Backlinks collected... ", queueItems.length)

  if (queueItems.length === 0) {
    console.warn("No backlinks!")
    parentPort.postMessage("workerFinished");
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
