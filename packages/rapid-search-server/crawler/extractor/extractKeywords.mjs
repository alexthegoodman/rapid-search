import axios from "axios";
import _ from "lodash";

import { parentPort } from "worker_threads";

import keyword_extractor from "keyword-extractor";

const getMostCommon = (arr, size = 5) => {
  const obj = {};
  arr.forEach((keyword) => {
    if (typeof obj[keyword] === "undefined") obj[keyword] = 0;
    obj[keyword] = obj[keyword] + 1;
  });

  // https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
  const entries = Object.entries(obj);
  const sortable = entries
    .sort(([, a], [, b]) => a - b)
    .slice(entries.length - size, entries.length)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  const sortableArray = Object.entries(sortable);

  return sortableArray;
};

export const extractKeywords = async (text) => {
  try {
    // TODO: remove SpaCy keyword extactor
    // const { data } = await axios.post("http://127.0.0.1:5000/keywords", {
    //   text, // can be the full excerpt
    // });

    const data = keyword_extractor.extract(text, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false,
    });

    const mostCommonKeywords = getMostCommon(data, 5);

    console.info("mostCommonKeywords", mostCommonKeywords);

    return { keywords: mostCommonKeywords };
  } catch (error) {
    console.error(error.message);
    parentPort.postMessage("workerFinished");
    process.exit(2);
  }
};
