import axios from "axios";
import _ from "lodash";
import string from "string-sanitizer";

import { parentPort } from "worker_threads";

function cleanString(input) {
  var output = "";
  for (var i=0; i<input.length; i++) {
      if (input.charCodeAt(i) <= 127) {
          output += input.charAt(i);
      }
  }
  return output;
}

export const summarizeText = async (text) => {
  text = text.substr(0, 2000); // always max sized excerpt
  // text = string.sanitize.keepSpace(text); // clear error-prone junk
  text = cleanString(text); // removes too much puncuation

  try {
    console.info("Sending text... ", text);

    const { data } = await axios.post("http://0.0.0.0:5000/summary", {
      text
    }, { timeout: 30000 });

    console.info("data", data);

    return { summary: data[0].summary_text };
  } catch (error) {
    console.error({ text, message: error.message  }); // TODO: tie message to sent text and url
    parentPort.postMessage("workerFinished");
    process.exit(2);
  }
};
