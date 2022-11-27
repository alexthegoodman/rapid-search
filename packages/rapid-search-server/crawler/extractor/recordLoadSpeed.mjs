import puppeteer from "puppeteer";

import { parentPort } from "worker_threads";

export const recordLoadSpeed = async (url) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // for **consistent** measurements
    const client = await page.target().createCDPSession();
    await client.send("Network.enable");
    await client.send("Network.emulateNetworkConditions", {
      offline: false,
      downloadThroughput: (4 * 1024 * 1024) / 8, // 0.52mb
      uploadThroughput: (3 * 1024 * 1024) / 8, // 0.39mb
      latency: 20,
    });

    await page.goto(url);

    const performanceTimingJson = await page.evaluate(() =>
      JSON.stringify(window.performance.timing)
    );
    const performanceTiming = JSON.parse(performanceTimingJson);
    const startToInteractive =
      performanceTiming.domInteractive - performanceTiming.navigationStart;

    console.log(`Navigation start to DOM interactive: ${startToInteractive}ms`);

    return { loadSpeed: startToInteractive };
  } catch (error) {
    console.error(error);
    parentPort.postMessage("workerFinished");
    process.exit(2);
  }
};
