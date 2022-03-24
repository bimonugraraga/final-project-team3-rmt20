import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://c4f8-202-80-214-98.ngrok.io",
  cache: new InMemoryCache(),
});


export default client;
