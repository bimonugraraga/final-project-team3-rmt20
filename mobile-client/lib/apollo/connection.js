import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://9568-110-137-37-159.ngrok.io',
  cache: new InMemoryCache()
})

export default client;