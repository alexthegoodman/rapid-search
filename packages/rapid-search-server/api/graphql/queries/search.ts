import { extendType, nonNull, stringArg } from "nexus";
import { normalizeText } from "../../../crawler/normalizeText";
import { Context } from "../../context";
import keyword_extractor from "keyword-extractor";

export const SearchQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("search", {
      type: "SearchResult",
      args: {
        query: nonNull(stringArg()),
      },
      resolve: async (_, { query }, { prisma }: Context, x) => {
        return results;
      },
    });
  },
});
