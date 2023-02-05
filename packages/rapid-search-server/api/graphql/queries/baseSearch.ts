import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

import { extractKeywords } from "../../../crawler/extractor/extractKeywords.js";

export const BaseSearchQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("baseSearch", {
      type: "SearchResult",
      args: {
        query: nonNull(stringArg()),
      },
      resolve: async (_, { query }, { prisma }: Context, x) => {
        query = query.replace(/&nbsp;/g, " ").toLowerCase();

        console.info("incoming base search", query);

        const pageResults = await prisma.page.findMany({
          where: {
            OR: [
              {
                metaTitleNormal: {
                  contains: query,
                },
              },
              {
                metaDescriptionNormal: {
                  contains: query,
                },
              },
              {
                excerptNormal: {
                  contains: query,
                },
              },
              // {
              //   summaryNormal: {
              //     contains: query
              //   }
              // }
            ],
          },
          // orderBy: {
          //   // topicScore: "desc",
          //   loadSpeedScore: "asc",
          // },
          take: 20,
        });

        console.info("pageResults", pageResults);

        return pageResults;
      },
    });
  },
});
