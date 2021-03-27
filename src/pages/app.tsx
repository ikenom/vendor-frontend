import * as React from "react";
import { useEffect } from "react";
import { AppFooter } from "../components/molecules/AppFooter";
import { OrdersHeader } from "../components/molecules/headers/OrdersHeader";
import OrderStore, { LINE_ITEM_CONTENT, LINE_ITEM_HEADER } from "../store/orderStore";
import { useState } from '@hookstate/core';
import { Router } from "@reach/router";
import { AppTabs } from "../components/organisms/Tabs";
import { disableBodyScroll } from "body-scroll-lock";

import styled, { createGlobalStyle } from 'styled-components'
import { Layout } from "antd";
import { OrderContent } from "../components/molecules/order";
import { OrderHeader } from "../components/molecules/headers/OrderHeader";
import { OrdersOrganismLayout } from "../components/layouts/orders";
import { OrderOrganismLayout } from "../components/layouts/order";



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

const App = () => {

  // Disables scrolling of App
  useEffect(() => {
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    disableBodyScroll(document.body);
  }, []);

  return (
    <>
      <GlobalStyle />
      <TestApp
      footer={<AppFooter selectedIcon="order"/>}
    />
    </>
  )
};

const AppLayout = styled(Layout)`
  width: 100%;
  min-height: 100vh;
  max-width: 700px;
  overflow: hidden;
  height: 100vh;
`;

export interface AppLayoutProps {
  header: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
}


const TestApp = (props: Partial<AppLayoutProps>) => {
  const { footer } = props;
  const orderStore = OrderStore.getInstance();
  const needsAction = useState(orderStore.getNeedsAction())
  const inKitchen = useState(orderStore.getInKitchen())
  const ready = useState(orderStore.getReady())
  const history = useState(orderStore.getHistory())

  return (
    <AppLayout>
      <Router basepath="/app">
          <OrdersOrganismLayout
            path="/"
            header={<OrdersHeader text="New Orders"/>}
            content={
              <AppTabs
                needsAction={needsAction.get()}
                inKitchen={inKitchen.get()}
                ready={ready.get()}
                history={history.get()}
              />}
            footer={footer}
          />
          <OrderOrganismLayout
            path="/order"
            header={<OrderHeader
              navProps={{text: "New Orders"}}
              contentProps={{ labelProps: { label: "Bubba B.", content: "Order #41" }}}
            />}
            content={<OrderContent
              lineItemContent={LINE_ITEM_CONTENT}
              lineItemHeader={LINE_ITEM_HEADER}
              button={{ onClick: () => {}, label: "Send To Kitchen"}}
            />}
            footer={footer}
          />
      </Router>
    </AppLayout>
  )
}
