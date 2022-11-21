const { Worker } = require("worker_threads");

export const startScanWorkers = (initialUrls: string[]) => {
  for (let i = 1; i <= 3; i++) {
    console.info("create worker", i);
    const worker = new Worker("./crawler/startScanQueue.ts", {
      workerData: { workerId: i, initialUrls },
    });

    worker.on("message", (message: any) => console.info("message", message));
    worker.on("error", (error: any) => console.error("error", error));
    worker.on("exit", (code: any) => {
      if (code !== 0)
        console.error(new Error(`Worker stopped with exit code ${code}`));
    });
  }
};
