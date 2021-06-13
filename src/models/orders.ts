import { Customer } from "./customer";
import { LineItem } from "./product";

export type OrderType = "TAKE OUT";
export type OrderStatus = "Needs Action" | "In Kitchen" | "Ready" | "History";

export interface Order {
  id: string;
  orderNumber: string;
  lineItems: LineItem[];
  customer: Customer;
  createdAt: string;
  price: string;
  type: OrderType;
  status: OrderStatus;
  timeRemaining?: number;
  status: string;
}