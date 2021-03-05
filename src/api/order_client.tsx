import { gql } from '@apollo/client';
import { client } from './client'

const PAGE_COUNT = 10

const getOrdersAsync = async (vendorId: String, after?: String, pageCount: Number = PAGE_COUNT) => {
  const result = await client.query({
    query: gql`
      query OrderQuery($vendorId: ID!, $first: Int!, $after: String!) {
        orders(vendorId: $vendorId, first: $first, after: $after) {
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
      vendorId: vendorId,
      first: pageCount,
      after: after == null ? "" : after
    }
  })

  return result.data
}

export default {
  getOrdersAsync
}
