import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App.js"
;
import ApolloClient from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from 'apollo-link-context'

const httpLink = createUploadLink({
  uri: "http://localhost:4000/graphql"
});

const authLink = setContext(() => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: token ? `Bearer ${token}` : '' } };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
