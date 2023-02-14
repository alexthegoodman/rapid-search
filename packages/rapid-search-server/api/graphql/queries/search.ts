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
        console.info("incoming search");
        contextQuery = contextQuery.replace(/&nbsp;/g, "");
        query = query.replace(/&nbsp;/g, " ");

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

        // const filterSummaryWideContext = {
        //   OR: [
        //     {
        //       summaryNormal: {
        //         contains: contextKeywordsOnly[0],
        //       },
        //     },
        //     {
        //       summaryNormal: {
        //         contains: contextKeywordsOnly[1],
        //       },
        //     },
        //     {
        //       summaryNormal: {
        //         contains: contextKeywordsOnly[2],
        //       },
        //     },
        //   ],
        // };

        const filterSummaryNarrowContext = {
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
            // {
            //   summaryNormal: {
            //     contains: contextKeywordsOnly[2],
            //   },
            // },
          ],
        };

        const filterSummaryWidePrimary = {
          OR: [
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

        const filterSummaryNarrowPrimary = {
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
            // {
            //   summaryNormal: {
            //     contains: keywordsOnly[2],
            //   },
            // },
          ],
        };

        let filters = [filterSummaryNarrowContext, filterSummaryWidePrimary];
        if (contextQuery === "") {
          filters = [filterSummaryNarrowPrimary];
        }

        const pageResults = await prisma.page.findMany({
          where: {
            AND: filters,
            // topicScore: {
            //   // gte: 0.4,
            //   gte: 0.1,
            // },
            ...filterByTopic,
          },
          // orderBy: {
          //   // topicScore: "desc",
          //   loadSpeedScore: "asc",
          // },
          take: 20,
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
