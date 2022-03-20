import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://738d-202-80-215-76.ngrok.io',
  cache: new InMemoryCache()
})

export default client;