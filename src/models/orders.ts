import { Customer } from "./customer";
import { Product } from "./product";

export type OrderType = "TAKE OUT"

export interface Order {
  id: String;
  lineItems: Product[];
  customer: Customer;
  createdAt: string;
  price: string;
  type: OrderType;
}