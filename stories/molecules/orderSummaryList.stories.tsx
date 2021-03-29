import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { width } from "styled-system";
import { OrderSummaryProps } from "../../src/components/molecules/orders/orderSummary";
import { OrderSummaryList } from "../../src/components/molecules/orders/orderSummaryList";

export default {
  title: "Molecules/OrderSummaryList",
} as Meta;

const Container = styled.div`
  ${width}
  height: 49px;
`
const ORDER_SUMMARIES: OrderSummaryProps[] = [
  {
    numOfItems: 6,
    customerName: "Bubba B.",
    orderType: "TAKE OUT",
    timeSinceOrderCreated: "34 min",
    price: "43.49"
  },
  {
    numOfItems: 4,
    customerName: "Jack F.",
    orderType: "TAKE OUT",
    timeSinceOrderCreated: "41 min",
    price: "51.32"
  },
  {
    numOfItems: 1,
    customerName: "Cindy P..",
    orderType: "TAKE OUT",
    timeSinceOrderCreated: "12 min",
    price: "20.32"
  },
]; 

export const ListComponent = () => {
  return(
    <Container width={343}>
      <OrderSummaryList orderSummaries={ORDER_SUMMARIES} onClick={() => {}}/>
    </Container>
  )
}