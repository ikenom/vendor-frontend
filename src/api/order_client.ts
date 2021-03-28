import { gql } from '@apollo/client';
import { client } from './client'

const PAGE_COUNT = 100

const getNeedsActionAsync = async (after?: String, pageCount: Number = PAGE_COUNT) => {
  const result = await client.query({
    query: gql`
      query OrderQuery($first: Int!, $after: String) {
        needsActions(first: $first, after: $after) {
          edges {
            node {
              id
              price
              createdAt
              lineItems {
                id
              }
              customer {
                firstName
                lastName
              }
            }
          },
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
    variables: {
      first: pageCount,
      after: after
    }
  })

  return result.data.needsActions
}

const getInKitchenAsync = async (after?: String, pageCount: Number = PAGE_COUNT) => {
  const result = await client.query({
    query: gql`
      query OrderQuery($first: Int!, $after: String) {
        inKitchen(first: $first, after: $after) {
          edges {
            node {
              id
              price
              createdAt
              lineItems {
                id
              }
              customer {
                firstName
                lastName
              }
            }
          },
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
    variables: {
      first: pageCount,
      after: after
    }
  })

  return result.data.inKitchen
}

const getReadyAsync = async (after?: String, pageCount: Number = PAGE_COUNT) => {
  const result = await client.query({
    query: gql`
      query OrderQuery($first: Int!, $after: String) {
        ready(first: $first, after: $after) {
          edges {
            node {
              id
              price
              createdAt
              lineItems {
                id
              }
              customer {
                firstName
                lastName
              }
            }
          },
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,
    variables: {
      first: pageCount,
      after: after
    }
  })

  return result.data.ready
}

export const subscribeToOrderUpdated = (callback: (arg0: any) => void) => {
  client.subscribe({
    query: gql`
      subscription OrderUpdatedSubscription {
        orderUpdated {
          id
        }
      }
    `
  }).subscribe({
    next(result) {
      callback(result.data)
    },
    error(err) { console.log('err', err); },
  })
}

export default {
  getNeedsActionAsync,
  getInKitchenAsync,
  getReadyAsync,
  subscribeToOrderUpdated
}
