import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://097d-110-137-38-233.ngrok.io',
  cache: new InMemoryCache()
})

export default client;
