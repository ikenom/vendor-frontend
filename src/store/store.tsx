import { createState } from '@hookstate/core';
import { OrderStore } from './orderStore';
import { Order } from '../models/orders';

interface AppStore {
  order: OrderStore
}

export const store = createState<AppStore>({
  order: {
    orders: []
  }
})