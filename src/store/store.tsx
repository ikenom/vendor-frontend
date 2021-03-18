import { createState } from '@hookstate/core';
import { OrderStore } from './orderStore';
import { Order } from '../models/orders';

interface AppStore {
  orderStore: OrderStore
}

export const store = createState<AppStore>({
  orderStore: {
    orders: []
  }
})