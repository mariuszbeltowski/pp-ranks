import { ApolloClient, InMemoryCache } from "@apollo/client";
import { config } from "../config";

const { backendApiUrl } = config;

export const apolloClient = new ApolloClient({
  uri: backendApiUrl,
  cache: new InMemoryCache(),
});
