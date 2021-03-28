import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, concat, DefaultOptions } from '@apollo/client';
import 'cross-fetch/polyfill';
import { createConsumer } from '@rails/actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';

const url = "http://35.193.167.21"
const cable = createConsumer(`${url}/cable`)
const httpLink = createHttpLink({
  uri: `${url}/graphql`
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

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, link),
  defaultOptions: defaultOptions
});