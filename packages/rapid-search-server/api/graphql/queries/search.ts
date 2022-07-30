import { extendType, nonNull, stringArg } from "nexus";
import { Context } from "../../context";

export const SearchQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("search", {
      type: "Link",
      args: {
        query: nonNull(stringArg()),
      },
      resolve: async (_, { query }, { prisma }: Context, x) => {
        const linkMatches = await prisma.link.findMany({
          where: {
            title: {
              contains: query,
            },
          },
        });

        return linkMatches;
      },
    });
  },
});
