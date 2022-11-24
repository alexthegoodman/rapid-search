import { parentPort } from "worker_threads";

export const excerptLength = 240;

export const extractPageInformation = ($) => {
  try {
    const titleContent = $("title").text().trim();
    let descriptionContent = $(`meta[name="description"]`).attr("content");
    descriptionContent =
      typeof descriptionContent !== "undefined"
        ? descriptionContent.trim()
        : "";
    const headlineText = $(`body h1`).text().trim();
    const bodyText = $(`body p`).text().trim();
    const articleText = $(`body article p`).text().trim();
    const body = articleText !== "" ? articleText : bodyText;
    const bodyExcerpt = bodyText.substr(0, excerptLength);
    const articleExcerpt = articleText.substr(0, excerptLength);
    const excerpt = articleExcerpt !== "" ? articleExcerpt : bodyExcerpt;

    console.info(
      "Page Info ",
      titleContent,
      "description: ",
      descriptionContent
    );
    console.info(
      "Body Info ",
      headlineText,
      "excerpt: ",
      articleExcerpt !== "",
      excerpt
    );

    return {
      titleContent,
      descriptionContent,
      headlineText,
      excerpt,
      body,
    };
  } catch (error) {
    console.error(error);
    parentPort.postMessage("workerFinished");
    process.exit(2);
  }
};
