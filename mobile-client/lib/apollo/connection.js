import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://0713-2404-8000-1024-1fb6-3969-dac1-213b-4528.ngrok.io",
  cache: new InMemoryCache(),
});


export default client;
