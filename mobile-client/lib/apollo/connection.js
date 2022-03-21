import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://7f5b-103-120-169-31.ngrok.io ",
  cache: new InMemoryCache(),
});

export default client;
