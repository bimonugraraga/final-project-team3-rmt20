import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://1955-2404-8000-1024-1fb6-5408-30ce-2df6-cebc.ngrok.io",
  cache: new InMemoryCache(),
});


export default client;
