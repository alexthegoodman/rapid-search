// import { setMaxListeners } from "process";

const { Worker } = require("worker_threads");

// 2 requests at once to same flask api is double total compute time on local
// but if the request at different times, can save time
// Warning: some sites may block for concurrent requests
const numOfWorkers = 3;

// require('events').EventEmitter.defaultMaxListeners = 20;

const startScanWorker = (i: number) => {
  console.info("startScanWorker");
  
  const worker = new Worker("./crawler/scanner/startScanQueue.mjs", {
    workerData: { numOfWorkers, workerId: i },
  });

  worker.on("message", (message: any) => {
    console.info("message", message);
    if (message === "workerFinished") {
      // delay 10 seconds then restart worker
      setTimeout(() => {
        console.info("respawn");
        startScanWorker(i);
      }, 2000);
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

export const startScanWorkers = () => {
  for (let i = 1; i <= numOfWorkers; i++) {
    console.info("create worker", i);
    startScanWorker(i);
  }
};
