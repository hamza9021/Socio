import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const client = new ApolloClient({
    link: new HttpLink({ uri: import.meta.env.VITE_GRAPQL_ENDPOINT }),
    cache: new InMemoryCache(),
})

export default client