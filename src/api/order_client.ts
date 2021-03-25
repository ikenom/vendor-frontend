import { gql } from '@apollo/client';
import { client } from './client'

const PAGE_COUNT = 10

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

export const subscribeToOrderCreated = (callback: (arg0: any) => void) => {
  client.subscribe({
    query: gql`
      subscription OrderSubscription {
        orderCreated {
          price
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
  subscribeToOrderCreated
}
