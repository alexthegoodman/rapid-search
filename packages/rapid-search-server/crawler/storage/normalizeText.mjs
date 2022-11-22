export const normalizeText = (text) => {
  let newText = text;

  if (newText) {
    newText = text ? text.toLowerCase() : text;
    newText?.replace(/[^\w\s\d]+/gi, "-"); // remove special chars
  }

  return newText;
};
