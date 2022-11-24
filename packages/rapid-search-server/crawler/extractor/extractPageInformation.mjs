// import { CheerioAPI } from "cheerio";

export const excerptLength = 240;

export const extractPageInformation = ($) => {
  const titleContent = $("title").text();
  const descriptionContent = $(`meta[name="description"]`).attr("content");
  const headlineText = $(`body h1`).text();
  const bodyText = $(`body p`).text();
  const articleText = $(`body article p`).text();
  const body = articleText !== "" ? articleText : bodyText;
  const bodyExcerpt = bodyText.substr(0, excerptLength).trim();
  const articleExcerpt = articleText.substr(0, excerptLength).trim();
  const excerpt = articleExcerpt !== "" ? articleExcerpt : bodyExcerpt;

  console.info("Page Info ", titleContent, "description: ", descriptionContent);
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
};
