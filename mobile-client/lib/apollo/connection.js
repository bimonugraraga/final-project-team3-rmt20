import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://dd36-110-137-39-12.ngrok.io",
  cache: new InMemoryCache(),
});


export default client;
