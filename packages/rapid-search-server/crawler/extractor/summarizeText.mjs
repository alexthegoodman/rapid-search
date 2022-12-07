import axios from "axios";
import _ from "lodash";

import { parentPort } from "worker_threads";

export const summarizeText = async (text) => {
  try {
    const { data } = await axios.post("http://18.217.198.241:5000/summary", {
      text: text.substr(0, 2000), // always max sized excerpt
    });

    console.info("data", data);

    return { summary: data[0].summary_text };
  } catch (error) {
    console.error(error.message);
    parentPort.postMessage("workerFinished");
    process.exit(2);
  }
};
