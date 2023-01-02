import { objectType } from "nexus";

export const MediaType = objectType({
  name: "Media",
  definition(t) {
    t.field("url", {
      type: "String",
    });

    t.field("type", {
      type: "String",
    });

    t.field("mimeType", {
      type: "String",
    });

    t.field("lastAnalyzedDate", {
      type: "DateTime",
    });

    t.field("updatedAt", {
      type: "DateTime",
    });
    t.field("createdAt", {
      type: "DateTime",
    });
  },
});
