import { objectType } from "nexus";

export const SearchResult = objectType({
  name: "SearchResult",
  definition(t) {
    t.field("url", {
      type: "String",
    });

    t.field("title", {
      type: "String",
    });
  },
});
