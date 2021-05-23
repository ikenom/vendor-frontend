import { State, createState } from '@hookstate/core';
import { Order } from '../models/orders';
import orderClient, { subscribeToOrderUpdated } from '../api/order_client';
import { hashCode } from './mockUtils';
import { formatPrice } from './utils';
import { OrdersByDate, partitionOrdersByDate } from '../models/utils';

export default class OrderStore {
  private static instance: OrderStore;

  private orders: State<Array<Order>>
  private needsAction: Order[] = []
  private ready: Order[] = []
  private inKitchen: Order[] = []

  private _needsActionUpdated: State<Boolean>;
  private _inKitchenUpdated: State<Boolean>;
  private _readyUpdated: State<Boolean>;

  private _isInitialLoad: State<Boolean>;

  static init = async () => {
    const orderStore = OrderStore.getInstance()
    await orderStore.updateOrders()
    orderStore.subscribeToOrderUpdates()
  }

  static mockInit = async () => {
    const orderStore = OrderStore.getInstance();
  }

  static getInstance(): OrderStore {
    if (!OrderStore.instance) {
      OrderStore.instance = new OrderStore();
    }

    return OrderStore.instance;
  }

  private constructor() {
    this.orders = createState<Array<Order>>([])
    this._needsActionUpdated = createState<Boolean>(false)
    this._inKitchenUpdated = createState<Boolean>(false)
    this._readyUpdated = createState<Boolean>(false)
    this._isInitialLoad = createState<Boolean>(true) // Allows us to render skeleton component
  }

  subscribeToOrderUpdates = () => {
    subscribeToOrderUpdated(this.orderUpdated)
  }

  getLineItemFromPayload = (node): LineItem => {
    return {
      id: node.id,
      price: node.price,
      mealName: node.product.name,
      lineItemNote: node.additionalComments
    }
  }

  getOrdersFromPayload = (payload): Order[] => {
    return payload.edges.map(edge => ({
      id: edge.node.id,
      orderNumber: hashCode(edge.node.id).toString(), // TODO: get this value from backend
      price: formatPrice(edge.node.price),
      createdAt: edge.node.createdAt,
      type: "TAKE OUT",
      lineItems: edge.node.lineItems.map(node => this.getLineItemFromPayload(node)),
      customer: {
        firstName: edge.node.customer.firstName,
        lastName: edge.node.customer.lastName,
      },
      status: edge.node.status,
      timeRemaining: 15 // TODO get this from the backend. This is a nullable field
    } as Order))
  }

  getOrders = () => {
    return this.orders;
  }

  getOrder = (orderNumber: String) => {
    return this.orders.value.find(order => {
      return order.orderNumber === orderNumber
    })
  }

  getIsInitialLoad = (): State<Boolean> => {
    return this._isInitialLoad;
  }

  static getNeedsAction = (order: Order[]) => {
    return order.filter(o => o.status === "NEEDS_ACTION")
  }

  static getInKitchen = (order: Order[]) => {
    return order.filter(o => o.status === "IN_KITCHEN")
  }

  static getReady = (order: Order[]) => {
    return order.filter(o => o.status === "READY")
  }

  static getHistory = (order: Order[]) => {
    return order.filter(o => o.status === "HISTORY")
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

    const needsAction = orders.filter(o => o.status === "NEEDS_ACTION")
    const inKitchenOrders = orders.filter(o => o.status === "IN_KITCHEN")
    const readyOrders = orders.filter(o => o.status === "READY")

    if(!this.isSameList(this.needsAction, needsAction) && this.needsAction.length < needsAction.length) {
      this._isInitialLoad.value ? this._needsActionUpdated.set(false) : this._needsActionUpdated.set(true)
      this.needsAction = needsAction
    }

    if(!this.isSameList(this.inKitchen, inKitchenOrders) && this.inKitchen.length < inKitchenOrders.length) {
      this._isInitialLoad.value ? this._inKitchenUpdated.set(false) : this._inKitchenUpdated.set(true)
      this.inKitchen = inKitchenOrders
    }

    if(!this.isSameList(this.ready, readyOrders) && this.ready.length < readyOrders.length) {
      this._isInitialLoad.value ? this._readyUpdated.set(false) : this._readyUpdated.set(true)
      this.ready = readyOrders
    }
  }

  private isSameList(listA: Order[], listB: Order[]): Boolean {
    const areSameLength = Object.keys(listA).length === Object.keys(listB).length;
    const haveMatchingElements = Object.keys(listA).every(element => listA[+element] === listB[+element])
    return areSameLength && haveMatchingElements;
  }

  updateOrders = async () => {
    // This list is what we use to navigate to orders by id
    await this.getOrdersAsync()

    if(this._isInitialLoad.get()) {
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

  removeLineItem = (id: string) => {

  }
}
