import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://17e1-2404-8000-1024-1fb6-81a-6a13-eac9-66e5.ngrok.io',
  cache: new InMemoryCache()
})

export default client;
