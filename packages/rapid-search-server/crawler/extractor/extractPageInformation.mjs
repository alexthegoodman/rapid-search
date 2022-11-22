import { CheerioAPI } from "cheerio";

export const extractPageInformation = ($) => {
  const titleElement = $("title")[0];
  const descriptionElement = $(`meta[name="description"]`)[0];
  const tagsElement = $(`meta[name="tags"]`)[0];

  const headerElement = $(`h1`)[0];
  const firstCopyElement = $(`p`)[0];

  // NOTE: some web pages have no meta tags set
  const titleContent =
    typeof titleElement !== "undefined" && titleElement.children.length
      ? titleElement.children[0]["data"]
      : null;
  const descriptionContent =
    typeof descriptionElement !== "undefined" && descriptionElement.attribs
      ? descriptionElement.attribs.content
      : null;
  const tagsContent =
    typeof tagsElement !== "undefined" && tagsElement.attribs
      ? tagsElement.attribs.content
      : null;

  const headerContent =
    typeof headerElement !== "undefined" && headerElement.children.length
      ? headerElement.children[0]["data"]
      : null;
  const firstCopyContent =
    typeof firstCopyElement !== "undefined" && firstCopyElement.children.length
      ? firstCopyElement.children[0]["data"]
      : null;

  console.info("titleContent", titleContent);

  // console.info(
  //   "titleContent",
  //   titleContent,
  //   "descriptionContent",
  //   descriptionContent,
  //   "tagsContent",
  //   tagsContent,
  //   "headerContent",
  //   headerContent,
  //   "firstCopyContent",
  //   firstCopyContent
  // );

  return {
    titleContent,
    descriptionContent,
    tagsContent,
    headerContent,
    firstCopyContent,
  };
};
