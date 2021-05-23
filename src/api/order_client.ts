import { gql } from '@apollo/client';
import { client } from './client'

const PAGE_COUNT = 100

const getOrdersAsync = async (status: String, after?: String, pageCount: Number = PAGE_COUNT) => {
  const result = await client.query({
    query: gql`
      query OrderQuery($status: OrderStatus, $first: Int!, $after: String) {
        orders(status: $status, first: $first, after: $after) {
          edges {
            node {
              id
              orderNumber
              lineItems {
                id
                price
                product {
                  name
                }
                quantity
                instructions
                additionalComments
              }
              customer {
                firstName
                lastName
              }
              price
              type
              status
              timeRemaining
              createdAt
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
      status: status,
      first: pageCount,
      after: after
    }
  })

  return result.data.orders
}

export const subscribeToOrderUpdated = (callback: (arg0: any) => void) => {
  client.subscribe({
    query: gql`
      subscription OrderUpdatedSubscription {
        orderUpdated {
          order {
            id
              orderNumber
              lineItems {
                id
                price
                product {
                  name
                }
                quantity
                instructions
                additionalComments
              }
              customer {
                firstName
                lastName
              }
              price
              type
              status
              timeRemaining
              createdAt
          }
        }
      }
    `
  }).subscribe({
    next(result) {
      console.log(result.data.order)
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
  sendToKitchenAsync,
  extendOrderAsync,
  completeOrderAsync,
  cancelOrderAsync,
  pauseOrderAsync,
  subscribeToOrderUpdated
}
