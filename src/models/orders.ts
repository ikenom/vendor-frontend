import { Customer } from "./customer";
import { Product } from "./product";

export type OrderType = "TAKE OUT";
export type OrderStatus = "Needs Action" | "In Kitchen" | "Ready" | "Completed";

export interface Order {
  id: String;
  lineItems: Product[];
  customer: Customer;
  createdAt: string;
  price: string;
  type: OrderType;
  status: OrderStatus
}