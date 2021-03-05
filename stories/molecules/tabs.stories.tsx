import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";import { AppTab } from "../../src/components/organisms/Tabs"
import { Order } from "../../src/models/orders";
import { DateTime } from 'luxon';

export default {
  title: "Molecules/Tabs/AppTab",
} as Meta;

const Container = styled.div`
  ${layout}
`


const ORDERS: Order[] = [
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Bubba",
      lastName: "Bud"
    },
    createdAt: DateTime.now().minus({seconds: 400}).toISO(),
    price: "63.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 450}).toISO(),
    price: "34.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Bobby",
      lastName: "Larson"
    },
    createdAt: DateTime.now().minus({seconds: 700}).toISO(),
    price: "45.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 1000}).toISO(),
    price: "34.42",
    type: "TAKE OUT"
  }
]

export const DefaultHeader = () => {
  return(
    <Container width={"100%"} height={648}>
      <AppTab orders ={ORDERS}/>
    </Container>
  )
}