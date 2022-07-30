const { Worker } = require("worker_threads");

export const startScanWorkers = (initialUrls) => {
  for (let i = 1; i <= 3; i++) {
    console.info("create worker", i);
    const worker = new Worker("./crawler/startScanQueue.ts", {
      workerData: { workerId: i, initialUrls },
    });

    worker.on("message", (message) => console.info("message", message));
    worker.on("error", (error) => console.error("error", error));
    worker.on("exit", (code) => {
      if (code !== 0)
        console.error(new Error(`Worker stopped with exit code ${code}`));
    });
  }
};
