// import { CheerioAPI } from "cheerio";

export const extractPageInformation = ($) => {
  const titleContent = $("title").text();
  const descriptionContent = $(`meta[name="description"]`).attr("content");
  const headlineText = $(`body h1`).text();
  const bodyText = $(`body p`).text();
  const excerpt = bodyText.substr(0, 140);

  console.info("Page Info ", titleContent, "description: ", descriptionContent);
  console.info("Body Info ", headlineText, "excerpt: ", excerpt);

  return {
    titleContent,
    descriptionContent,
    headlineText,
    excerpt,
  };
};