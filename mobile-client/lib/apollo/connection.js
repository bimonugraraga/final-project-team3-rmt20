import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://90e7-2404-8000-1024-1fb6-b1cf-c089-ec7f-205b.ngrok.io',
  cache: new InMemoryCache()
})

export default client;
