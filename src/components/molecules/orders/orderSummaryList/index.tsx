import { OrderSummaryProps, OrderSummarySkeletonWrapper, OrderSummaryWithDivider } from "../orderSummary";
import styled from "styled-components";
import React from "react";

const OrderSummaryContainer = styled.div`
  margin-bottom: 12px;
  max-height: 100%;
`;


interface OrderSummaryListProps {
  orderSummaries: Omit<OrderSummaryProps, "onClick">[];
  onClick: (orderNumber: string) => void;
  isLoading: boolean;
  displayTime?: boolean;
};

export const OrderSummaryList = (props: OrderSummaryListProps) => {
  const { orderSummaries, onClick, isLoading, displayTime } = props;

  return(
    <>
    {orderSummaries.map(orderSummary => {
      return (
        <OrderSummaryContainer key={orderSummary.id}>
          <OrderSummarySkeletonWrapper showSkeleton={isLoading} orderSummaryProps={{...orderSummary, onClick, displayTimeAsTimestamp: displayTime}} key={orderSummary.orderNumber}/>
        </OrderSummaryContainer>)
    })}
    </>
  )
}
