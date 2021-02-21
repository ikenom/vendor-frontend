import { Meta } from "@storybook/react";
import React from "react";
import { OrderSummary } from "../../src/components/molecules/orderSummary"


export default {
  title: "Molecules/OrderSummary",
} as Meta;


export const OrderSummaryBasic = () => {
  <>
    <OrderSummary
      numOfItems={5}
      customerName="Bubba B."
      orderType="TAKE OUT"
      timeSinceOrderCreated="31 min"
      price="63.30"
    />
  </>
}
