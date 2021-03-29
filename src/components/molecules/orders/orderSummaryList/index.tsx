import { OrderSummaryProps, OrderSummaryWithDivider } from "../orderSummary";
import styled from "styled-components";
import React from "react";

const OrderSummaryContainer = styled.div`
  margin-bottom: 12px;
  max-height: 100%;
`;


interface OrderSummaryListProps {
  orderSummaries: Omit<OrderSummaryProps, "onClick">[];
  onClick: (orderNumber: string) => void;
};

export const OrderSummaryList = (props: OrderSummaryListProps) => {
  const { orderSummaries, onClick } = props;

  return(
    <>
    {orderSummaries.map(orderSummary => {
      return (
        <OrderSummaryContainer key={orderSummary.id}>
          <OrderSummaryWithDivider {...orderSummary} onClick={onClick} key={orderSummary.orderNumber}/>
        </OrderSummaryContainer>)
    })}
    </>
  )
}
