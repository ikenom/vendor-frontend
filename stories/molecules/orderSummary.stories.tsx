import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { OrderSummary, OrderSummaryWithDivider } from "../../src/components/molecules/orderSummary"
import { width } from 'styled-system';


export default {
  title: "Molecules/OrderSummary",
} as Meta;

const Container = styled.div`
  ${width}
  height: 49px;
`


export const OrderSummaryBasic = () => {
  return(
    <Container width={343}>
      <OrderSummary
        numOfItems={5}
        customerName="Bubba B."
        orderType="TAKE OUT"
        timeSinceOrderCreated="31 min"
        price="63.30"
      />
    </Container>
  )
}

export const OrderSummaryWithDivide = () => {
  return(
    <Container width={343}>
      <OrderSummaryWithDivider
          numOfItems={5}
          customerName="Bubba B."
          orderType="TAKE OUT"
          timeSinceOrderCreated="31 min"
          price="63.30"
        />
    </Container>
  )
}

export const OrderSummaryResponsive = () => {
  return(
    <Container width={{ sm: 414}}>
      <OrderSummary
        numOfItems={5}
        customerName="Bubba B."
        orderType="TAKE OUT"
        timeSinceOrderCreated="31 min"
        price="63.30"
      />
    </Container>
  )
}
