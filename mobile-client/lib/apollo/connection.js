import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://194d-114-124-208-196.ngrok.io',
  cache: new InMemoryCache()
})

export default client;