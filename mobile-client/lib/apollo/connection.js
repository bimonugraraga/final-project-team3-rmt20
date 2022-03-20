import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://7ec9-103-130-131-215.ngrok.io',
  cache: new InMemoryCache()
})

export default client;