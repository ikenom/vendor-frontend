import React from "react";
import { Order } from "../../../models/orders";
import { orderToOrderSummaryAdapter } from "../../../models/utils";
import { OrderSummaryList } from "../../molecules/orderSummaryList";

export interface NewOrdersProps {
  orders: Order[];
  onClick: ()=> any;
}

export const NewOrders = (props: NewOrdersProps) => {
  const { orders, onClick } = props;
  const orderSummaries = orders.map(order => orderToOrderSummaryAdapter(order));
  return (
    <OrderSummaryList orderSummaries={orderSummaries} onClick={onClick}/>
  )
}