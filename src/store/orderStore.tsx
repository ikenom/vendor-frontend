import { State, createState } from '@hookstate/core';
import { Order } from '../models/orders';
import orderClient, { subscribeToOrderUpdated } from '../api/order_client';
import _ from 'cypress/types/lodash';
import { hashCode } from './mockUtils';
export default class OrderStore {
  private static instance: OrderStore;

  private orders: State<Array<Order>>
  private needsAction: State<Array<Order>>
  private inKitchen: State<Array<Order>>
  private ready: State<Array<Order>>
  private history: State<Array<Order>>

  private _needsActionUpdated: State<Boolean>;
  private _inKitchenUpdated: State<Boolean>;
  private _readyUpdated: State<Boolean>;

  private _isInitialLoad: State<Boolean>;

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
    this._needsActionUpdated = createState<Boolean>(false)
    this._inKitchenUpdated = createState<Boolean>(false)
    this._readyUpdated = createState<Boolean>(false)
    this._isInitialLoad = createState<Boolean>(true)
  }

  connect = () => {
    subscribeToOrderUpdated(this.orderUpdated)
  }

  getOrdersFromPayload = (payload): Order[] => {
    return payload.edges.map(edge => ({
      id: edge.node.id,
      orderNumber: hashCode(edge.node.id).toString(),
      price: edge.node.price,
      createdAt: edge.node.createdAt,
      type: "TAKE OUT",
      lineItems: edge.node.lineItems.map((lineItem: { id: String; }) => ({ id: lineItem.id })),
      customer: {
        firstName: edge.node.customer.firstName,
        lastName: edge.node.customer.lastName,
      }
    } as Order))
  }

  getOrder = (orderNumber: String) => {
    return this.orders.value.find(order => {
      return order.orderNumber === orderNumber
    })
  }

  getOrders = () : State<Array<Order>> => {
    return this.orders
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

    if(!this.isSame(this.needsAction.get(), needsAction)) {
      this._needsActionUpdated.set(true)
      this.needsAction.set(needsAction)
    }
  }

  private isSame(listA: Order[], listB: Order[]): Boolean {
    const idsA = listA.map((item: Order) => item.id)
    const idsB = listB.map((item: Order) => item.id)
    const remainingA = idsB.filter((item: any) => idsA.indexOf(item) < 0);
    const remainingB = idsA.filter((item: any) => idsB.indexOf(item) < 0);

    return remainingA.length == 0 && remainingB.length == 0
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

    if(!this.isSame(this.inKitchen.get(), inKitchen)) {
      this._inKitchenUpdated.set(true)
      this.inKitchen.set(inKitchen)
    }
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

    if(!this.isSame(this.inKitchen.get(), ready)) {
      this._readyUpdated.set(true)
      this.ready.set(ready)
    }
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

    if(this._isInitialLoad.get().valueOf()) {
      this._isInitialLoad.set(false)
    }
  }

  orderUpdated = async () => {
    await this.updateOrders()
  }

  sendToKitchenAsync = async (orderId: String, time: Date) => {
    await orderClient.sendToKitchenAsync(orderId, time)
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

  extendOrderAsync = async (orderId: String, time: Date) => {
    await orderClient.extendOrderAsync(orderId, time)
  }

  get needsActionUpdated() {
    return this._needsActionUpdated
  }

  viewedNeedsActionUpdates = () => {
    this._needsActionUpdated.set(false)
  }

  get inKitchenUpdated() {
    return this._inKitchenUpdated
  }

  viewedInKitchenUpdates = () => {
    this._inKitchenUpdated.set(false)
  }

  get readyUpdated() {
    return this._readyUpdated
  }

  viewedReadyUpdates = () => {
    this._readyUpdated.set(false)
  }
  
  get isInitialLoad() {
    return this._isInitialLoad;
  }
}
