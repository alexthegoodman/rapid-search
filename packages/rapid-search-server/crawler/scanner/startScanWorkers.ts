const { Worker } = require("worker_threads");

const numOfWorkers = 3;

export const startScanWorkers = (initialUrls: object[]) => {
  for (let i = 1; i <= numOfWorkers; i++) {
    console.info("create worker", i);
    const worker = new Worker("./crawler/scanner/startScanQueue.mjs", {
      workerData: { numOfWorkers, workerId: i, initialUrls },
    });

    worker.on("message", (message: any) => console.info("message", message));
    worker.on("error", (error: any) => console.error("error", error));
    worker.on("exit", (code: any) => {
      if (code !== 0)
        console.error(new Error(`Worker stopped with exit code ${code}`));
    });
  }
};
