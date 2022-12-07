import { extendType, nonNull, nullable, stringArg } from "nexus";
import { Context } from "../../context";

import { extractKeywords } from "../../../crawler/extractor/extractKeywords.js";

export const SearchQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("search", {
      type: "SearchData",
      args: {
        // each query is parsed for keywords
        // two query fields allows keyword extraction from two different fields
        topicClassificationSlug: nullable(stringArg()),
        contextQuery: nonNull(stringArg()),
        query: nonNull(stringArg()),
      },
      resolve: async (
        _,
        { topicClassificationSlug, contextQuery, query },
        { prisma }: Context,
        x
      ) => {
        const { keywords: contextKeywords, keywordsOnly: contextKeywordsOnly } =
          await extractKeywords(contextQuery, 3);
        const { keywords, keywordsOnly } = await extractKeywords(query, 3);

        console.info("queryKeywords", contextKeywords, keywords);

        // optionally filter results by topic
        let filterByTopic = {};
        if (
          typeof topicClassificationSlug !== "undefined" &&
          topicClassificationSlug
        ) {
          filterByTopic = {
            topicClassification: {
              generatedInterestSlug: {
                equals: topicClassificationSlug,
              },
            },
          };
        }

        const filterByTitle = {
          AND: [
            {
              metaTitleNormal: {
                contains: contextKeywordsOnly[0],
              },
            },
            {
              metaTitleNormal: {
                contains: contextKeywordsOnly[1],
              },
            },
            {
              metaTitleNormal: {
                contains: contextKeywordsOnly[2],
              },
            },
            {
              metaTitleNormal: {
                contains: keywordsOnly[0],
              },
            },
            {
              metaTitleNormal: {
                contains: keywordsOnly[1],
              },
            },
            {
              metaTitleNormal: {
                contains: keywordsOnly[2],
              },
            },
          ],
        };

        const filterBySummary = {
          AND: [
            {
              summaryNormal: {
                contains: contextKeywordsOnly[0],
              },
            },
            {
              summaryNormal: {
                contains: contextKeywordsOnly[1],
              },
            },
            {
              summaryNormal: {
                contains: contextKeywordsOnly[2],
              },
            },
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
        };

        const filterByExcerpt = {
          AND: [
            {
              excerptNormal: {
                contains: contextKeywordsOnly[0],
              },
            },
            {
              excerptNormal: {
                contains: contextKeywordsOnly[1],
              },
            },
            {
              excerptNormal: {
                contains: contextKeywordsOnly[2],
              },
            },
            {
              excerptNormal: {
                contains: keywordsOnly[0],
              },
            },
            {
              excerptNormal: {
                contains: keywordsOnly[1],
              },
            },
            {
              excerptNormal: {
                contains: keywordsOnly[2],
              },
            },
          ],
        };

        const pageResults = await prisma.page.findMany({
          where: {
            // return pages where the summary contains the top 3 query keywords
            OR: [filterByTitle, filterBySummary, filterByExcerpt],
            // topicScore: {
            //   // gte: 0.4,
            //   gte: 0.1,
            // },
            ...filterByTopic,
          },
          orderBy: {
            // topicScore: "desc",
            loadSpeedScore: "asc",
          },
        });

        console.info("pageResults", pageResults);

        return {
          contextKeywords: contextKeywordsOnly,
          keywords: keywordsOnly,
          results: pageResults,
        };
      },
    });
  },
});
