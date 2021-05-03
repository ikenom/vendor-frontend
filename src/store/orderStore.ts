import { State, createState } from '@hookstate/core';
import { Order } from '../models/orders';
import orderClient, { subscribeToOrderUpdated } from '../api/order_client';
import { hashCode } from './mockUtils';
import { formatPrice } from './utils';
import { OrdersByDate, partitionOrdersByDate } from '../models/utils';
export default class OrderStore {
  private static instance: OrderStore;

  private orders: State<Array<Order>>
  private needsAction: State<Array<Order>>
  private inKitchen: State<Array<Order>>
  private ready: State<Array<Order>>
  private history: State<OrdersByDate>

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
    this.needsAction = createState<Array<Order>>([])
    this.inKitchen = createState<Array<Order>>([])
    this.ready = createState<Array<Order>>([])
    this.history = createState<OrdersByDate>({})
    this.orders = createState<Array<Order>>([])
    this._needsActionUpdated = createState<Boolean>(false)
    this._inKitchenUpdated = createState<Boolean>(false)
    this._readyUpdated = createState<Boolean>(false)
    this._isInitialLoad = createState<Boolean>(true) // Allows us to render skeleton component
  }

  subscribeToOrderUpdates = () => {
    subscribeToOrderUpdated(this.orderUpdated)
  }

  getOrdersFromPayload = (payload): Order[] => {
    return payload.edges.map(edge => ({
      id: edge.node.id,
      orderNumber: hashCode(edge.node.id).toString(), // TODO: get this value from backend
      price: formatPrice(edge.node.price),
      createdAt: edge.node.createdAt,
      type: "TAKE OUT",
      lineItems: edge.node.lineItems.map((lineItem: { id: String; }) => ({ id: lineItem.id })),
      customer: {
        firstName: edge.node.customer.firstName,
        lastName: edge.node.customer.lastName,
      },
      timeRemaining: 15 // TODO get this from the backend. This is a nullable field
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

  getIsInitialLoad = (): State<Boolean> => {
    return this._isInitialLoad;
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
    const needsAction: Order[] = []

    while(hasNext) {
      const result = await orderClient.getNeedsActionAsync(cursor)
      needsAction.push(...this.getOrdersFromPayload(result))

      hasNext = result.pageInfo.hasNextPage
      cursor = result.pageInfo.endCursor
    }

    if(!this.isSameList(this.getNeedsAction().value, needsAction) && this.getNeedsAction().value.length < needsAction.length) {
      this._isInitialLoad.value ? this._needsActionUpdated.set(false) : this._needsActionUpdated.set(true)
    }

    this.needsAction.set(needsAction);
    return
  }

  private isSameList(listA: Order[], listB: Order[]): Boolean {
    const areSameLength = Object.keys(listA).length === Object.keys(listB).length;
    const haveMatchingElements = Object.keys(listA).every(element => listA[+element] === listB[+element])
    return areSameLength && haveMatchingElements;
  }

  getInKitchen = () => {
    return this.inKitchen
  }

  getInKitchenAsync = async () => {
    let cursor: String = null
    let hasNext = true
    const inKitchenOrders: Order[] = []

    while(hasNext) {
      const result = await orderClient.getInKitchenAsync(cursor)
      inKitchenOrders.push(...this.getOrdersFromPayload(result))

      hasNext = result.pageInfo.hasNextPage
      cursor = result.pageInfo.endCursor
    }

    if(!this.isSameList(this.getInKitchen().value, inKitchenOrders) && this.getInKitchen().value.length < inKitchenOrders.length) {
      this._isInitialLoad.value ? this._inKitchenUpdated.set(false) : this._inKitchenUpdated.set(true)
    }

    this.inKitchen.set(inKitchenOrders)
    return
  }

  getReady = () => {
    return this.ready
  }

  getReadyAsync = async () => {
    let cursor: String = null
    let hasNext = true
    const readyOrders: Order[] = []

    while(hasNext) {
      const result = await orderClient.getReadyAsync(cursor)
      readyOrders.push(...this.getOrdersFromPayload(result))

      hasNext = result.pageInfo.hasNextPage
      cursor = result.pageInfo.endCursor
    }

    if(!this.isSameList(this.getReady().value, readyOrders) && this.getReady().value.length < readyOrders.length) {
      this._isInitialLoad.value ? this._readyUpdated.set(false) : this._readyUpdated.set(true)
    }

    this.ready.set(readyOrders)
    return
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

    this.history.set(partitionOrdersByDate(history))
  }

  updateOrders = async () => {
    
    // This list is what we use to navigate to orders by id
    await this.getOrdersAsync()

    // These list are used for the UI to be able to match the domain of the data.
    await this.getNeedsActionAsync()
    await this.getInKitchenAsync()
    await this.getReadyAsync()
    await this.getHistoryAsync()

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
}
