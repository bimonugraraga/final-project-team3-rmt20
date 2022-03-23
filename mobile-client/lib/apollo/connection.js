import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://fd36-202-80-212-109.ngrok.io',
  cache: new InMemoryCache()
})

export default client;
