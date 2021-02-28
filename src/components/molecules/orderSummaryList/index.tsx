import { OrderSummaryProps, OrderSummaryWithDivider } from "../orderSummary";
import styled from "styled-components";
import React from "react";

const OrderSummaryContainer = styled.div`
  margin-bottom: 12px;
`;


interface OrderSummaryListProps {
  orderSummaries: Omit<OrderSummaryProps, "onClick">[];
  onClick: () => any;
};

export const OrderSummaryList = (props: OrderSummaryListProps) => {
  const { orderSummaries, onClick } = props;

  return(
    <>
    {orderSummaries.map(orderSummary => {
      return (
        <OrderSummaryContainer>
          <OrderSummaryWithDivider {...orderSummary} onClick={onClick}/>
        </OrderSummaryContainer>)
    })}
    </>
  )
}
