export const env = process.env.NEXT_PUBLIC_APP_ENV;

export const cpDomain = env === "production" ? "" : "localhost";

export const cpGraphqlUrl =
  env === "production" ? "" : "http://localhost:4000/graphql";
