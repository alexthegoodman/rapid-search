import axios from "axios";
import _ from "lodash";

import { parentPort } from "worker_threads";

export const extractKeywords = async (text) => {
  try {
    const { data } = await axios.post("http://127.0.0.1:5000/keywords", {
      text, // can be the full excerpt
    });

    console.info("extractKeywords data", data);

    return { keywords: data };
  } catch (error) {
    console.error(error);
    parentPort.postMessage("workerFinished");
    process.exit(2);
  }
};
