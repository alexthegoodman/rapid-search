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
            OR: [
              {
                AND: [
                  {
                    normalTitle: {
                      contains: searchQuery.subject1
                        ? searchQuery.subject1
                        : "",
                    },
                  },
                  {
                    normalTitle: {
                      contains: searchQuery.subject2
                        ? searchQuery.subject2
                        : "",
                    },
                  },
                  {
                    normalTitle: {
                      contains: searchQuery.subject3
                        ? searchQuery.subject3
                        : "",
                    },
                  },
                ],
              },
              {
                AND: [
                  {
                    normalDescription: {
                      contains: searchQuery.subject1
                        ? searchQuery.subject1
                        : "",
                    },
                  },
                  {
                    normalDescription: {
                      contains: searchQuery.subject2
                        ? searchQuery.subject2
                        : "",
                    },
                  },
                  {
                    normalDescription: {
                      contains: searchQuery.subject3
                        ? searchQuery.subject3
                        : "",
                    },
                  },
                ],
              },
              // {
              //   normalTitle: {
              //     contains: searchQuery.normalText,
              //   },
              // },
              // {
              //   normalDescription: {
              //     contains: searchQuery.normalText,
              //   },
              // },
            ],
          },
          take: 5,
        });
      },
    });
  },
});
