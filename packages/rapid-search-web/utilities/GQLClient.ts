import { GraphQLClient } from "graphql-request";
import { cpGraphqlUrl } from "../def/urls";

export class GQLClient {
  client: GraphQLClient;
  token;

  constructor(token: string) {
    this.token = token;

    this.client = new GraphQLClient(cpGraphqlUrl, {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
  }
}
