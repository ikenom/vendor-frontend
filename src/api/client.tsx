import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();
console.log(process.env.BACKEND_URL)
const link = createHttpLink({ uri: `${process.env.BACKEND_URL}/graphql`})

export const client = new ApolloClient( {cache, link});