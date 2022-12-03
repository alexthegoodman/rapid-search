import { objectType } from "nexus";
import { Context } from "../../context";

export const SearchResult = objectType({
  name: "SearchResult",
  definition(t) {
    t.field("id", {
      type: "String",
    });

    t.field("url", {
      type: "String",
    });

    t.field("metaTitle", {
      type: "String",
    });

    t.field("metaDescription", {
      type: "String",
    });

    t.field("headline", {
      type: "String",
    });

    t.field("excerpt", {
      type: "String",
    });

    t.field("summary", {
      type: "String",
    });

    t.field("loadSpeedScore", {
      type: "Int",
    });

    t.field("topicClassification", {
      type: "Interest",
      resolve: async (page, __, context: Context) => {
        return await context.prisma.interest.findFirst({
          where: {
            pages: {
              some: {
                id: page.id as string,
              },
            },
          },
        });
      },
    });

    t.field("topicScore", {
      type: "Float",
    });
  },
});
