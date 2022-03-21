import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://da40-2404-8000-1024-1fb6-75b8-252e-7c04-b7a2.ngrok.io',
  cache: new InMemoryCache()
})

export default client;