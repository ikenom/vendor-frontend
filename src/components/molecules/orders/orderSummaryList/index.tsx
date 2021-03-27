import { OrderSummaryProps, OrderSummaryWithDivider } from "../orderSummary";
import styled from "styled-components";
import React from "react";

const OrderSummaryContainer = styled.div`
  margin-bottom: 12px;
  max-height: 100%;
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
      const { numOfItems } = orderSummary
      return (
        <OrderSummaryContainer>
          <OrderSummaryWithDivider {...orderSummary} onClick={onClick} key={Math.floor(Math.random() * numOfItems)}/>
        </OrderSummaryContainer>)
    })}
    </>
  )
}
