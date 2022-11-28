import { extendType, nonNull, stringArg } from "nexus";
import { Context } from "../../context";

import { extractKeywords } from "../../../crawler/extractor/extractKeywords.js";

export const SearchQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("search", {
      type: "SearchData",
      args: {
        query: nonNull(stringArg()),
      },
      resolve: async (_, { query }, { prisma }: Context, x) => {
        const { keywords, keywordsOnly } = await extractKeywords(query);

        console.info("queryKeywords", keywords);

        const pageResults = await prisma.page.findMany({
          where: {
            // return pages where the summary contains the top 3 query keywords
            AND: [
              {
                summaryNormal: {
                  contains: keywordsOnly[0],
                },
              },
              {
                summaryNormal: {
                  contains: keywordsOnly[1],
                },
              },
              {
                summaryNormal: {
                  contains: keywordsOnly[2],
                },
              },
            ],
          },
          orderBy: {
            topicScore: "desc",
            // loadSpeedScore: "desc",
          },
        });

        console.info("pageResults", pageResults);

        return { keywords: keywordsOnly, results: pageResults };
      },
    });
  },
});
