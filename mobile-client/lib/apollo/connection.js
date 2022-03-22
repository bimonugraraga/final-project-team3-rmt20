import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://26da-202-80-212-109.ngrok.io',
  cache: new InMemoryCache()
})

export default client;