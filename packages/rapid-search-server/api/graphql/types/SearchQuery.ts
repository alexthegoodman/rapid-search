import { objectType } from "nexus";
import { Context } from "../../context";

export const SearchQueryType = objectType({
  name: "SearchQuery",
  definition(t) {
    t.field("normalText", {
      type: "String",
    });

    t.field("volume", {
      type: "Int",
    });

    t.field("subject1", {
      type: "String",
    });

    t.field("subject2", {
      type: "String",
    });

    t.field("subject3", {
      type: "String",
    });

    t.list.field("links", {
      type: "Link",
      resolve: async (searchQuery, __, context: Context) => {
        return await context.prisma.link.findMany({
          where: {
            normalTitle: {
              contains: searchQuery.normalText,
            },
          },
        });
      },
    });
  },
});
