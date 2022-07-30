import { startApolloServer } from "./api";
import { startScanQueue } from "./robot";

startApolloServer();

// Start Robot:
// const testUrls = [
//   { id: null, url: "https://en.wikipedia.org/wiki/List_of_hobbies" },
//   { id: null, url: "https://dmitripavlutin.com/parse-url-javascript/" },
// ];

// startScanQueue(testUrls);
