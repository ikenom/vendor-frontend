import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, concat } from '@apollo/client';
import 'cross-fetch/polyfill';

const cache = new InMemoryCache();

const url = process.env.BACKEND_URL
const link = createHttpLink({ uri: `${url}/graphql`})

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  });

  return forward(operation);
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, link),
});