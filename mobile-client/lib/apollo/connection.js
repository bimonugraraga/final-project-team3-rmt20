import {ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://49a2-114-124-238-215.ngrok.io',
  cache: new InMemoryCache()
})

export default client;