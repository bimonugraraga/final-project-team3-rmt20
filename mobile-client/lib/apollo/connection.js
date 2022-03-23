import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://0902-140-213-150-197.ngrok.io",
  cache: new InMemoryCache(),
});

export default client;
