import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import 'cross-fetch/polyfill';
import { createConsumer } from '@rails/actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';

const cable = createConsumer("ws://localhost:5700/cable")
const httpLink = createHttpLink({
  uri: '/graphql',
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

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache()
});