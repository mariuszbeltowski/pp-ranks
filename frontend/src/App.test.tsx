import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./lib/apollo-client";

test("renders ranking page", () => {
  const { getAllByText } = render(
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  );

  getAllByText("Table tenis ranking");
});
