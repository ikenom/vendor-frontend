import { Customer } from "./customer";
import { Product } from "./product";

export type OrderType = "TAKE OUT"

export interface Order {
  lineItems: Product[];
  customer: Customer;
  createdAt: string;
  price: string;
  type: OrderType;
}