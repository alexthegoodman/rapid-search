import { extendType, nonNull, stringArg } from "nexus";
import { normalizeText } from "../../../crawler/normalizeText";
import { Context } from "../../context";
import keyword_extractor from "keyword-extractor";

export const SearchQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("searchQueries", {
      type: "SearchQuery",
      args: {
        query: nonNull(stringArg()),
      },
      resolve: async (_, { query }, { prisma }: Context, x) => {
        const normalQuery = normalizeText(query);

        console.info("normalQuery", normalQuery);

        // get search query subjects / keywords
        const extractedKeywords = keyword_extractor.extract(normalQuery, {
          language: "english",
          remove_digits: true,
          return_changed_case: true,
          remove_duplicates: false,
        });

        console.info("extractedKeywords", extractedKeywords);

        // check for existing query
        const matchingQuery = await prisma.searchQuery.findFirst({
          where: {
            normalText: {
              equals: normalQuery,
            },
          },
        });

        if (matchingQuery) {
          // update volume of existing query
          await prisma.searchQuery.update({
            where: {
              id: matchingQuery.id,
            },
            data: {
              volume: matchingQuery.volume + 1,
            },
          });
        } else {
          // add query to database
          await prisma.searchQuery.create({
            data: {
              normalText: normalQuery,
              volume: 1,
              subject1: extractedKeywords[0],
              subject2: extractedKeywords[1],
              subject3: extractedKeywords[2],
            },
          });
        }

        // get search results
        const searchQueries = await prisma.searchQuery.findMany({
          where: {
            AND: [
              {
                normalText: {
                  contains: extractedKeywords[0],
                },
              },
              {
                normalText: {
                  contains: extractedKeywords[1],
                },
              },
              {
                normalText: {
                  contains: extractedKeywords[2],
                },
              },
            ],
          },
          orderBy: {
            updatedAt: "desc",
          },
          take: 5,
        });

        console.info("searchQueries", searchQueries);

        return searchQueries;
      },
    });
  },
});
