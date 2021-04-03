import React from "react";
import { Order } from "../../../../models/orders";
import { orderToOrderSummaryAdapter } from "../../../../models/utils";
import { OrderSummaryList } from "../orderSummaryList";

export interface OrdersViewProps {
  orders: Order[];
  onClick: (orderNumber: string) => void;
  isLoading: boolean;
}

export const OrdersTabView = (props: OrdersViewProps) => {
  const { orders, onClick, isLoading } = props;
  const orderSummaries = orders.map(order => orderToOrderSummaryAdapter(order));
  return (
    <OrderSummaryList orderSummaries={orderSummaries} onClick={onClick} isLoading={isLoading}/>
  )
}