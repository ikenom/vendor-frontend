import { State } from '@hookstate/core';
import { Order } from '../models/orders';
import orderClient from '../api/order_client'

export interface OrderStore {
  orders: Order[];
}

export const getOrdersAsync = async (order: State<OrderStore>, vendorId: String) => {
  let cursor: String = null
  let hasNext = true

  while(hasNext) {
    const result = await orderClient.getOrdersAsync(vendorId, cursor)
    const orders = result.orders.edges.map(edge => ({
      price: edge.node.price,
      createdAt: edge.node.createdAt,
      type: "TAKE OUT",
      lineItems: edge.node.lineItems.map((lineItem: { id: String; }) => ({ id: lineItem.id })),
      customer: {
        firstName: edge.node.customer.firstName,
        lastName: edge.node.customer.lastName,
      }
    }))

    hasNext = result.orders.pageInfo.hasNextPage
    cursor = result.orders.pageInfo.endCursor
    order.orders.merge(orders)
    console.log(order.orders.get())
  }
}