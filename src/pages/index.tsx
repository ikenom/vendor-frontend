import * as React from "react";
import { useEffect } from "react";
import BasicLayout from "../components/layouts/basic";
import { AppFooter } from "../components/molecules/AppFooter";
import { OrdersHeader } from "../components/molecules/headers/OrdersHeader";
import { getOrdersAsync, orders } from "../store/orderStore";
import { useState, State } from '@hookstate/core';
import { store } from "../store/store";
import { AppTab } from "../components/organisms/Tabs";

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale; 
    text-rendering: optimizeLegibility; 
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
  const order = useState(store.order)

  useEffect(() => {
    getOrdersAsync(order, "")
  }, [])

  console.log(order.orders.get())

  return (
    <>
      <GlobalStyle />
      <BasicLayout
      header={<OrdersHeader text="New Orders"/>}
      content={<AppTab orders={order.orders.get()} />}
      footer={<AppFooter selectedIcon="order"/>}
    />
    </>
  )
};