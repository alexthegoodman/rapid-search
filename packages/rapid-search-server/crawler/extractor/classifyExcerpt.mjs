import axios from "axios";
import _ from "lodash";

import { parentPort } from "worker_threads";

export const classifyExcerpt = async (excerpt) => {
  try {
    let { data } = await axios.post("http://0.0.0.0:5000/topic", {
      text: excerpt,
    });

    data = data[0];

    const topMatch = _.maxBy(_.keys(data), (o) => {
      return data[o];
    });

    const topMatchRating = data[topMatch];

    const classification = {
      topic: topMatch,
      topicRating: topMatchRating,
    };

    console.info("classify", classification);

    return classification;
  } catch (error) {
    console.error(error.message);
    parentPort.postMessage("workerFinished");
    process.exit(2);
  }
};
