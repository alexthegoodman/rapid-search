import { gql } from "graphql-request";

export const searchesQuery = gql`
  query SearchQueries($query: String!) {
    searchQueries(query: $query) {
      normalText
      subject1
      subject2
      subject3
      volume

      links {
        title
        url
        description
      }
    }
  }
`;
