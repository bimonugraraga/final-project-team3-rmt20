import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://3d45-103-130-131-215.ngrok.io',
  cache: new InMemoryCache()
})

export default client;