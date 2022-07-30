import { extendType, nonNull, stringArg } from "nexus";
import { normalizeText } from "../../../robot";
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
        const normalQuery = normalizeText(query);

        const linkMatches = await prisma.link.findMany({
          where: {
            normalTitle: {
              contains: normalQuery,
            },
          },
        });

        return linkMatches;
      },
    });
  },
});
