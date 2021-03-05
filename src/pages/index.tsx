import * as React from "react";
import BasicLayout from "../components/layouts/basic";
import { AppFooter } from "../components/molecules/AppFooter";
import { OrdersHeader } from "../components/molecules/headers/OrdersHeader";
import { OrderSummaryProps } from "../components/molecules/orderSummary";
import { OrderSummaryList } from "../components/molecules/orderSummaryList";
import { Order } from "../models/orders";
import { DateTime } from 'luxon';
import { NewOrders } from "../components/organisms/newOrders";
import { AppTab } from "../components/organisms/Tabs";


const IndexPage = () => {
  return (
    <App />
  )
};

export default IndexPage;

/**
 * 
 * Wraps apollo provider around root element of app. This helps ensure reacts DOM doesn't
 * do unnecessary re-renders
 * Resources:
 * -- https://www.youtube.com/watch?v=wNUg1jpj9T0&list=WL&index=7&t=1305s&ab_channel=ApolloGraphQL
 * -- https://www.youtube.com/watch?v=BrBK4yxodXA&ab_channel=Gatsby
 */


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
  },
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
  },
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

const App = () => {
  return (
    <BasicLayout
      header={<OrdersHeader text="New Orders"/>}
      content={<AppTab orders={ORDERS} />}
      footer={<AppFooter selectedIcon="order"/>}
    />
  )
};