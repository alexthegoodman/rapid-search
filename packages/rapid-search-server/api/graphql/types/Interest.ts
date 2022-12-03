import { objectType } from "nexus";

export const InterestType = objectType({
  name: "Interest",
  definition(t) {
    t.field("id", {
      type: "String",
    });

    t.field("name", {
      type: "String",
    });

    t.field("generatedInterestSlug", {
      type: "String",
    });
  },
});
