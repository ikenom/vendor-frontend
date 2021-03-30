import { gql } from '@apollo/client';
import { client } from './client'

const PAGE_COUNT = 100

const getOrdersAsync = async (after?: String, pageCount: Number = PAGE_COUNT) => {
  const result = await client.query({
    query: gql`
      query OrderQuery($first: Int!, $after: String) {
        orders(first: $first, after: $after) {
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

  return result.data.orders
}

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

const getHistoryAsync = async (after?: String, pageCount: Number = PAGE_COUNT) => {
  const result = await client.query({
    query: gql`
      query OrderQuery($first: Int!, $after: String) {
        history(first: $first, after: $after) {
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

  return result.data.history
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

const sendToKitchenAsync = async (orderId: String, time: Date) => {
  const result = await client.mutate({
    mutation: gql`
      mutation sendToKitchen($orderId: ID!, $targetTime: ISO8601DateTime!) {
        sendToKitchen(input: {orderId: $orderId, targetTime: $targetTime}) {
          succeeded
        }
      }
    `,
    variables: {
      orderId: orderId,
      targetTime: time
    }
  })
  return result.data.sendToKitchen
}

const extendOrderAsync = async (orderId: String, time: Date) => {
  const result = await client.mutate({
    mutation: gql`
      mutation extendOrder($orderId: ID!, $targetTime: ISO8601DateTime!) {
        extendOrder(input: {orderId: $orderId, targetTime: $targetTime}) {
          succeeded
        }
      }
    `,
    variables: {
      orderId: orderId,
      targetTime: time
    }
  })
  return result.data.extendOrder
}

const completeOrderAsync = async (orderId: String) => {
  const result = await client.mutate({
    mutation: gql`
      mutation completeOrder($orderId: ID!) {
        completeOrder(input: {orderId: $orderId}) {
          succeeded
        }
      }
    `,
    variables: {
      orderId: orderId
    }
  })
  return result.data.completeOrder
}

const cancelOrderAsync = async (orderId: String) => {
  const result = await client.mutate({
    mutation: gql`
      mutation cancelOrder($orderId: ID!) {
        cancelOrder(input: {orderId: $orderId}) {
          succeeded
        }
      }
    `,
    variables: {
      orderId: orderId
    }
  })
  return result.data.cancelOrder
}

const pauseOrderAsync = async (orderId: String) => {
  const result = await client.mutate({
    mutation: gql`
      mutation pauseOrder($orderId: ID!) {
        pauseOrder(input: {orderId: $orderId}) {
          succeeded
        }
      }
    `,
    variables: {
      orderId: orderId
    }
  })
  return result.data.pauseOrder
}

export default {
  getOrdersAsync,
  getNeedsActionAsync,
  getInKitchenAsync,
  getReadyAsync,
  getHistoryAsync,
  sendToKitchenAsync,
  extendOrderAsync,
  completeOrderAsync,
  cancelOrderAsync,
  pauseOrderAsync,
  subscribeToOrderUpdated
}
