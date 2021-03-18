import * as React from "react";
import { useEffect } from "react";
import BasicLayout from "../components/layouts/basic";
import { AppFooter } from "../components/molecules/AppFooter";
import { OrdersHeader } from "../components/molecules/headers/OrdersHeader";
import { getOrdersAsync } from "../store/orderStore";
import { useState, State } from '@hookstate/core';
import { store } from "../store/store";
import { AppTab } from "../components/organisms/Tabs";
import { disableBodyScroll } from "body-scroll-lock";

import { createGlobalStyle } from 'styled-components'
import { Order } from "../models/orders";
import { DateTime } from "luxon";
import { getOrders } from "../api/order_client";
import OrderStore from '../store/orderStore2'

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
    createdAt: DateTime.now().minus({seconds: 1400}).toISO(),
    price: "63.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}, {id: "3"}],
    customer: {
      firstName: "Ken",
      lastName: "Lamar"
    },
    createdAt: DateTime.now().minus({seconds: 1540}).toISO(),
    price: "31.45",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}, {id: "4"}, {id: "2"}, {id: "4"}],
    customer: {
      firstName: "Bobby",
      lastName: "Larson"
    },
    createdAt: DateTime.now().minus({seconds: 1700}).toISO(),
    price: "29.31",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}, {id: "2"}, {id: "4"}, {id: "2"}],
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 2000}).toISO(),
    price: "34.42",
    type: "TAKE OUT"
  }
]

const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    padding: 0;
  }
`

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

const App = () => {

  const orderStore = new OrderStore()

  // Disables scrolling of App
  useEffect(() => {
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    disableBodyScroll(document.body);

    orderStore.connect()
  }, []);

  const needsAction = orderStore.getNeedsAction()

  return (
    <>
      {
        needsAction.get().map(item => {
          return (
          <div>
            <p id={item.id}>{item.price}</p>
          </div>
          )
        })
      }
    </>
  )
};