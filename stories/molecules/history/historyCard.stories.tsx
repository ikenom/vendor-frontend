import { Meta } from "@storybook/react";
import React from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import { layout } from "styled-system";
import { HistoryCard } from "../../../src/components/molecules/history/card";
import { HistoryCardList } from "../../../src/components/molecules/history/cardList";
import { Order } from "../../../src/models/orders";
import { Product } from "../../../src/models/product";
import { partitionOrdersByDate } from "../../../src/models/utils";

export default {
  title: "Molecules/History/HistoryCard",
} as Meta;

const Container = styled.div`
  ${layout}
`

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    price: "9.50",
    mealName: "Buffalo Chicken Wings",
    specialIngredient: "Bleu Cheese Dressing",
    lineItemNote: {
      instructions: "Instructions",
      additionalComments: {title: "Additional Comments", details: "bleh"}
    }
  }
]

const ORDERS: Order[] =  [
  {
    id: "1",
    orderNumber: "1",
    lineItems: MOCK_PRODUCTS,
    customer: {
      firstName: "Bubba",
      lastName: "Bud"
    },
    createdAt: DateTime.now().minus({seconds: 400}).toISO(),
    price: "10",
    type: "TAKE OUT",
    status: "Needs Action"
  },
  {
    id: "2",
    orderNumber: "2",
    lineItems: MOCK_PRODUCTS,
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 450}).toISO(),
    price: "10",
    type: "TAKE OUT",
    status: "Needs Action"
  },
  {
    id: "3",
    orderNumber: "3",
    lineItems: MOCK_PRODUCTS,
    customer: {
      firstName: "Bobby",
      lastName: "Larson"
    },
    createdAt: DateTime.now().minus({seconds: 700}).toISO(),
    price: "10",
    type: "TAKE OUT",
    status: "Needs Action"
  }]

  const ORDERS_TWO: Order[] =  [
    {
      id: "4",
      orderNumber: "1",
      lineItems: MOCK_PRODUCTS,
      customer: {
        firstName: "Bubba",
        lastName: "Bud"
      },
      createdAt: DateTime.now().minus({day: 1}).toISO(),
      price: "10",
      type: "TAKE OUT",
      status: "Needs Action"
    },
    {
      id: "5",
      orderNumber: "2",
      lineItems: MOCK_PRODUCTS,
      customer: {
        firstName: "Sammy",
        lastName: "Smith"
      },
      createdAt: DateTime.now().minus({day: 1}).toISO(),
      price: "10",
      type: "TAKE OUT",
      status: "Needs Action"
    },
    {
      id: "6",
      orderNumber: "3",
      lineItems: MOCK_PRODUCTS,
      customer: {
        firstName: "Bobby",
        lastName: "Larson"
      },
      createdAt: DateTime.now().minus({day: 2}).toISO(),
      price: "10",
      type: "TAKE OUT",
      status: "Needs Action"
    }]

export const HistoryCardStory = () => {
  return(
    <Container width={375}>
      <HistoryCard 
        label={DateTime.now()}
        orders={ORDERS}
        onClick={() => {}}
        isLoading={false}
      />
    </Container>
  )
}

export const HistoryCardListStory = () => {

  const orderByDate = partitionOrdersByDate([...ORDERS, ...ORDERS_TWO])
  return(
    <Container width={375}>
      <HistoryCardList 
        ordersByDate={orderByDate}
        onClick={() => {}}
        isLoading={false}
      />
    </Container>
  )
}
