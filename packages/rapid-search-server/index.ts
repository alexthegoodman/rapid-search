import { startScanQueue } from "./robot";

const testUrls = [
  { id: null, url: "https://en.wikipedia.org/wiki/List_of_hobbies" },
  { id: null, url: "https://dmitripavlutin.com/parse-url-javascript/" },
];

startScanQueue(testUrls);

// scanPage();
