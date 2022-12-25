import puppeteer from "puppeteer";

import { parentPort } from "worker_threads";

export const recordLoadSpeed = async (url) => {
  const browser = await puppeteer.launch();
  
  try {
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

    await page.goto(url, { timeout: 10000 });

    const performanceTimingJson = await page.evaluate(() =>
      JSON.stringify(window.performance.timing)
    );
    const performanceTiming = JSON.parse(performanceTimingJson);
    const startToInteractive =
      performanceTiming.domInteractive - performanceTiming.navigationStart;

    await browser.close();

    console.log(`Navigation start to DOM interactive: ${startToInteractive}ms`);

    return { loadSpeed: startToInteractive };
  } catch (error) {
    console.error(error.message);
    await browser.close();
    parentPort.postMessage("workerFinished");
    process.exit(2);
  }
};
