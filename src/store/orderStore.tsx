import { State, createState } from '@hookstate/core';
import { Order } from '../models/orders';
import orderClient, { subscribeToOrderUpdated } from '../api/order_client';
import { LineItemContentProps } from '../components/molecules/lineItem/lineItemContent';
import { LineItemHeaderProps } from '../components/atoms/lineItem/header';

export default class OrderStore {
  private static instance: OrderStore;
  orders: State<Array<Order>>
  needsAction: State<Array<Order>>
  inKitchen: State<Array<Order>>
  ready: State<Array<Order>>
  history: State<Array<Order>>

  static init = async () => {
    const orderStore = OrderStore.getInstance()
    await orderStore.updateOrders()
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
    this.inKitchen = createState<Array<Order>>([])
    this.ready = createState<Array<Order>>([])
    this.history = createState<Array<Order>>([])
    this.orders = createState<Array<Order>>([])
  }

  connect = () => {
    subscribeToOrderUpdated(this.orderUpdated)
  }

  getOrdersFromPayload = (payload) => {
    return payload.edges.map(edge => ({
      id: edge.node.id,
      price: edge.node.price,
      createdAt: edge.node.createdAt,
      type: "TAKE OUT",
      lineItems: edge.node.lineItems.map((lineItem: { id: String; }) => ({ id: lineItem.id })),
      customer: {
        firstName: edge.node.customer.firstName,
        lastName: edge.node.customer.lastName,
      }
    }))
  }

  getOrder = (orderId: String) => {
    return this.orders.filter(order => order.get().id == orderId)[0]
  }

  getOrdersAsync = async () => {
    let cursor: String = null
    let hasNext = true
    const orders = []

    while(hasNext) {
      const result = await orderClient.getOrdersAsync(cursor)
      orders.push(...this.getOrdersFromPayload(result))

      hasNext = result.pageInfo.hasNextPage
      cursor = result.pageInfo.endCursor
    }

    this.orders.set(orders)
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
      needsAction.push(...this.getOrdersFromPayload(result))

      hasNext = result.pageInfo.hasNextPage
      cursor = result.pageInfo.endCursor
    }

    this.needsAction.set(needsAction)
  }

  getInKitchen = () => {
    return this.inKitchen
  }

  getInKitchenAsync = async () => {
    let cursor: String = null
    let hasNext = true
    const inKitchen = []

    while(hasNext) {
      const result = await orderClient.getInKitchenAsync(cursor)
      inKitchen.push(...this.getOrdersFromPayload(result))

      hasNext = result.pageInfo.hasNextPage
      cursor = result.pageInfo.endCursor
    }

    this.inKitchen.set(inKitchen)
  }

  getReady = () => {
    return this.ready
  }

  getReadyAsync = async () => {
    let cursor: String = null
    let hasNext = true
    const ready = []

    while(hasNext) {
      const result = await orderClient.getReadyAsync(cursor)
      ready.push(...this.getOrdersFromPayload(result))

      hasNext = result.pageInfo.hasNextPage
      cursor = result.pageInfo.endCursor
    }

    this.ready.set(ready)
  }

  getHistory = () => {
    return this.history
  }

  getHistoryAsync = async () => {
    let cursor: String = null
    let hasNext = true
    const history = []

    while(hasNext) {
      const result = await orderClient.getHistoryAsync(cursor)
      history.push(...this.getOrdersFromPayload(result))

      hasNext = result.pageInfo.hasNextPage
      cursor = result.pageInfo.endCursor
    }

    this.history.set(history)
  }

  updateOrders = async () => {
    await this.getOrdersAsync()
    await this.getNeedsActionAsync()
    await this.getInKitchenAsync()
    await this.getReadyAsync()
    await this.getHistoryAsync()
  }

  orderUpdated = async () => {
    await this.updateOrders()
  }

  sendToKitchenAsync = async (orderId: String) => {
    await orderClient.sendToKitchenAsync(orderId)
  }

  completeOrderAsync = async (orderId: String) => {
    await orderClient.completeOrderAsync(orderId)
  }

  pauseOrderAsync = async (orderId: String) => {
    await orderClient.pauseOrderAsync(orderId)
  }

  cancelOrderAsync = async (orderId: String) => {
    await orderClient.cancelOrderAsync(orderId)
  }
}

let details = "";
for (let i = 0; i < 20; i++) {
  details = details.concat("Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum");
}

const lineItemNote = {
  instructions: {title: "Instructions", details},
  additionalComments: {title: "Additional Comments", details}
}

const lineItemSummary = {
  price: "9.50",
  mealName: "Buffalo Chicken Wings",
  specialIngredient: "Bleu Cheese Dressing",
  position: 1
}

export const LINE_ITEM_CONTENT: LineItemContentProps = {
  lineItemSummary,
  lineItemNote
}

export const LINE_ITEM_HEADER: LineItemHeaderProps = {
  lineItemHeader: {
    numOfItems: 1,
    price: "9.50"
  }
}