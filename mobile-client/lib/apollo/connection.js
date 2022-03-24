import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://d212-140-213-150-253.ngrok.io",
  cache: new InMemoryCache(),
});


export default client;
