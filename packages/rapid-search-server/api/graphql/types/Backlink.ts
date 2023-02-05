import { objectType } from "nexus";

export const BacklinkType = objectType({
  name: "Backlink",
  definition(t) {
    t.field("id", {
      type: "String",
    });

    t.field("targetUrl", {
      type: "String",
    });

    t.field("originUrl", {
      type: "String",
    });

    t.field("analyzedDate", {
      type: "DateTime",
    });

    t.field("count", {
      type: "Int",
    });

    t.field("updatedAt", {
      type: "DateTime",
    });
    t.field("createdAt", {
      type: "DateTime",
    });
  },
});
