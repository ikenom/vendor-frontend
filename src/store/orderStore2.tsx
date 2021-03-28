import { State, createState } from '@hookstate/core';
import orderClient, { subscribeToOrderUpdated } from '../api/order_client';
import { Order } from '../models/orders';

export default class OrderStore {
  private static instance: OrderStore;
  needsAction: State<Array<Order>>

  static init = async () => {
    const orderStore = OrderStore.getInstance()
    await orderStore.getNeedsActionAsync()
    orderStore.connect()
  }

  static getInstance(): OrderStore {
    if (!OrderStore.instance) {
      OrderStore.instance = new OrderStore();
    }

    return OrderStore.instance;
  }

  private constructor() {
    this.needsAction = createState<Array<Order>>([])
  }

  connect = () => {
    subscribeToOrderUpdated(this.orderUpdated)
  }

  getNeedsAction = () : State<Array<Order>> => {
    return this.needsAction
  }

  getNeedsActionAsync = async () => {
    let cursor: String = null
    let hasNext = true
    const needsAction = []

    while(hasNext) {
      const result = await orderClient.getNeedsActionAsync(cursor)
      const partial_needs_action = result.edges.map(edge => ({
        price: edge.node.price,
        createdAt: edge.node.createdAt,
        type: "TAKE OUT",
        lineItems: edge.node.lineItems.map((lineItem: { id: String; }) => ({ id: lineItem.id })),
        customer: {
          firstName: edge.node.customer.firstName,
          lastName: edge.node.customer.lastName,
        }
      }))

      hasNext = result.pageInfo.hasNextPage
      cursor = result.pageInfo.endCursor
      needsAction.push(...partial_needs_action)
    }

    console.log(needsAction)
    this.needsAction.set(needsAction)
  }

  orderUpdated = async () => {
    await this.getNeedsActionAsync()
  }
}