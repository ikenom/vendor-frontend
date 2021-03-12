import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import 'cross-fetch/polyfill';

const cache = new InMemoryCache();

const url = process.env.BACKEND_URL
console.log(process.env.BACKEND_URL)
const link = createHttpLink({ uri: `${url}/graphql`})

export const client = new ApolloClient( {cache, link});