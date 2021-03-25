import { State, createState } from '@hookstate/core';
import orderClient, { subscribeToOrderCreated } from '../api/order_client';
import { Order } from '../models/orders';

export default class OrderStore {
  private static instance: OrderStore;
  needsAction: State<Array<Order>>

  static init = async () => {
    const orderStore = OrderStore.getInstance()
    await orderStore.getNeedsActionAsync()
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
    subscribeToOrderCreated(this.orderCreated)
  }

  getNeedsAction = () : State<Array<Order>> => {
    return this.needsAction
  }

  getNeedsActionAsync = async () => {
    const result = await orderClient.getNeedsActionAsync();

    const needsAction = result.nodes.map(order => ({
      price: order.price,
      createdAt: order.createdAt,
      type: "TAKE OUT",
      lineItems: order.lineItems.map((lineItem: { id: String; }) => ({ id: lineItem.id })),
      customer: {
        firstName: order.customer.firstName,
        lastName: order.customer.lastName,
      }
    }))

    this.needsAction.set(needsAction)
    console.log(this.needsAction)
  }

  orderCreated = (data) => {
    const order = {
      id: data.orderCreated.id,
      price: data.orderCreated.price
    }
    // console.log(data)
    this.needsAction.set([order])
  }
}