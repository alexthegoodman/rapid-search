import express from "express";
import { server } from "./server";

export const startApolloServer = async () => {
  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  const port = process.env.PORT
    ? (process.env.PORT as unknown as number)
    : 4001;

  const host = "0.0.0.0";

  await new Promise<void>((r) => app.listen(port, host, r));

  console.info(
    `🚀 Server ready at http://${host}:${port}${server.graphqlPath}`
  );
};
