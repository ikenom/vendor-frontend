import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();
const url = process.env.BACKEND_URL === null ? "http://shopify-service/graphql" : process.env.BACKEND_URL
console.log(url)
const link = createHttpLink({ uri: `${url}/graphql`})

export const client = new ApolloClient( {cache, link});