import { objectType } from "nexus";

export const SearchData = objectType({
  name: "SearchData",
  definition(t) {
    t.nullable.list.field("contextKeywords", {
      type: "String",
    });

    t.nullable.list.field("keywords", {
      type: "String",
    });

    t.nullable.list.field("results", {
      type: "SearchResult",
    });
  },
});
