import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://3da4-2404-8000-1024-1fb6-b8de-7cd1-231d-43f1.ngrok.io",
  cache: new InMemoryCache(),
});


export default client;
