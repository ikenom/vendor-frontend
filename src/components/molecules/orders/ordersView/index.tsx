import React from "react";
import { Order } from "../../../../models/orders";
import { orderToOrderSummaryAdapter } from "../../../../models/utils";
import { OrderSummaryList } from "../orderSummaryList";

export interface OrdersViewProps {
  orders: Order[];
  onClick: () => void;
}

export const OrdersTabView = (props: OrdersViewProps) => {
  const { orders, onClick } = props;
  const orderSummaries = orders.map(order => orderToOrderSummaryAdapter(order));
  return (
    <OrderSummaryList orderSummaries={orderSummaries} onClick={onClick}/>
  )
}