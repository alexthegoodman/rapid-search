const { Worker } = require("worker_threads");

const numOfWorkers = 3;

const startScanWorker = (initialUrls: object[], i: number) => {
  const worker = new Worker("./crawler/scanner/startScanQueue.mjs", {
    workerData: { numOfWorkers, workerId: i, initialUrls },
  });

  worker.on("message", (message: any) => {
    console.info("message", message);
    if (message === "workerFinished") {
      // delay 10 seconds then restart worker
      setTimeout(() => {
        console.info("respawn");
        startScanWorker(initialUrls, i);
      }, 10000);
    }
  });
  worker.on("error", (error: any) => console.error("error", error));
  worker.on("exit", (code: any) => {
    console.info("exit", code);

    if (code !== 0) {
      console.error(new Error(`Worker stopped with exit code ${code}`));
    }
  });
};

export const startScanWorkers = (initialUrls: object[]) => {
  for (let i = 1; i <= numOfWorkers; i++) {
    console.info("create worker", i);
    startScanWorker(initialUrls, i);
  }
};
