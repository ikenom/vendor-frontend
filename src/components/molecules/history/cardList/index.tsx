import React from "react";
import { getDateTime, OrdersByDate } from "../../../../models/utils";
import { HistoryCard } from "../card";


export interface HistoryCardListProps {
  ordersByDate: OrdersByDate,
  onClick: (orderNumber: string) => any;
  isLoading: boolean;
}

export const HistoryCardList = (props: HistoryCardListProps) => {
  const { ordersByDate, onClick, isLoading } = props;

  return (
    <>
      {Object.keys(ordersByDate).map((key, index) => {
        const orders = ordersByDate[key];
        return <HistoryCard 
          label={getDateTime(key)}
          orders={orders}
          onClick={onClick}
          isLoading={isLoading}
          key={index}
        />
      })}
    </>
  )
}