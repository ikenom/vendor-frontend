import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();

const url = process.env.BACKEND_URL
console.log(process.env.RELEASE_NAME)
const link = createHttpLink({ uri: `${url}/graphql`})

export const client = new ApolloClient( {cache, link});