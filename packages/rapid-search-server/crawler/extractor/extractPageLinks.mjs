import { parentPort } from "worker_threads";

export const extractPageLinks = ($, origin) => {
  try {
    const allPageLinks = $(`a`);

    const pageLinksData = [];
    Array.from(allPageLinks).forEach((link, x) => {
      const { href } = link.attribs;

      try {
        const linkData = new URL(href, origin);
        // TODO: do not add links starting with ? (query) or # (hash)
        let allow = true;
        if (href !== "/" && linkData.pathname === "/") allow = false;
        if (linkData.origin === "null") allow = false;
        if (linkData.hash !== "") allow = false; // do not add links with hash
        if (linkData.search !== "") allow = false; // do not add links w/query strings
        //   if (linkData.pathname === "") allow = false;

        if (allow) {
          const nextIndex = pageLinksData.length;
          // console.info("pass link", linkData.pathname);
          pageLinksData[nextIndex] = linkData;
        }
      } catch (error) {
        // invalid url
        console.error("error", href, error);
      }
    });

    const first10Links = pageLinksData.slice(0, 10);

    return first10Links;
  } catch (error) {
    console.error(error.message);
    parentPort.postMessage("workerFinished");
    process.exit(2);
  }
};
