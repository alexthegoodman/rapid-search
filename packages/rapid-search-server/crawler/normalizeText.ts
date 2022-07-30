export const normalizeText = (text: string | null) => {
  let newText: string | null = text;

  if (newText) {
    newText = text ? text.toLowerCase() : text;
    newText?.replace(/[^\w\s\d]+/gi, "-"); // remove special chars
  }

  return newText;
};
