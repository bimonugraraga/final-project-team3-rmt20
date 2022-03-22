import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://44d3-140-213-150-103.ngrok.io",
  cache: new InMemoryCache(),
});


export default client;
