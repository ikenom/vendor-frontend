import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, concat } from '@apollo/client';
import 'cross-fetch/polyfill';
import { createConsumer } from '@rails/actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';

const url = process.env.BACKEND_URL
const cable = createConsumer(`ws://${url}:5700/cable`)
const httpLink = createHttpLink({
  uri: `${url}/graphql`,
  credentials: 'include'
});

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
  )
}

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({cable}),
  httpLink
);

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