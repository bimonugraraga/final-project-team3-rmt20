import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://af17-110-137-39-140.ngrok.io",
  cache: new InMemoryCache(),
});


export default client;
