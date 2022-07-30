import { extendType, nonNull, stringArg } from "nexus";
import { normalizeText } from "../../../crawler";
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

        console.info("normalQuery", normalQuery);

        // add query to database
        const matchingQuery = await prisma.searchQuery.findFirst({
          where: {
            noramlText: {
              equals: normalQuery,
            },
          },
        });

        if (matchingQuery) {
          await prisma.searchQuery.update({
            where: {
              id: matchingQuery.id,
            },
            data: {
              volume: matchingQuery.volume + 1,
            },
          });
        } else {
          await prisma.searchQuery.create({
            data: {
              noramlText: normalQuery,
              volume: 1,
            },
          });
        }

        // get search results
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
