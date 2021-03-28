import * as React from "react";
import { useEffect } from "react";
import BasicLayout from "../components/layouts/basic";
import { AppFooter } from "../components/molecules/AppFooter";
import { OrdersHeader } from "../components/molecules/headers/OrdersHeader";
import OrderStore, { LINE_ITEM_CONTENT, LINE_ITEM_HEADER } from "../store/orderStore";
import { useState, State } from '@hookstate/core';
import { Router } from "@reach/router";
import { store } from "../store/store";
import { AppTab } from "../components/organisms/Tabs";
import { disableBodyScroll } from "body-scroll-lock";

import styled, { createGlobalStyle } from 'styled-components'
import { Order } from "../models/orders";
import { DateTime } from "luxon";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { OrderContent } from "../components/organisms/order/content";
import { OrderHeader } from "../components/molecules/headers/OrderHeader";



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

  useEffect(() => {
    // getOrdersAsync(order, "")
  }, [])

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
  minHeight: 100vh;
  max-width: 700px;
  overflow: hidden;
  height: 100vh;
  width: 100%;
`;

const HeaderWithContentLayout = styled(Layout)`
  height: 85%;
  width: 92%;
  background: transparent;
  padding: 0px;
  margin: 0px 16px 0px 16px;
`;

const OrdersHeaderLayout = styled(Header)`
  height: 10%;
  width: 100%;
  background: transparent;
  padding: 0px;
`;

const OrdersContentLayout = styled(Content)`
  height: 90%;
  width: 100%;
  overflow-y: scroll;
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 1%;
`;

const OrderHeaderLayout = styled(Header)`
  height: 23%;
  width: 100%;
  background: transparent;
  padding: 0px;
`;

const OrderContentLayout = styled(Content)`
  height: 77%;
  max-height: 85%;
  width: 100%;
  margin-top: 1%;
`;

const FooterLayout = styled(Footer)`
  height: 15%;
  width: 100%;
  padding: 0;
  margin-top: 0%;
`;

export interface AppLayoutProps {
  header: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
}

export interface OrderOrganismLayoutProps {
  header: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
  path: string;
}


const OrdersOrganism = (props: OrderOrganismLayoutProps) => {
  const { header, content, footer } = props;

  return (
    <AppLayout>
      <HeaderWithContentLayout>
        <OrdersHeaderLayout>
          {header}
        </OrdersHeaderLayout>
        <OrdersContentLayout>
          {content}
        </OrdersContentLayout>
      </HeaderWithContentLayout>
      <FooterLayout>
        {footer}
      </FooterLayout>
    </AppLayout>
  )
}

const OrderOrganism = (props: OrderOrganismLayoutProps) => {
  const { header, content, footer } = props;

  return (
    <AppLayout>
      <HeaderWithContentLayout>
        <OrderHeaderLayout>
          {header}
        </OrderHeaderLayout>
        <OrderContentLayout>
          {content}
        </OrderContentLayout>
      </HeaderWithContentLayout>
      <FooterLayout>
        {footer}
      </FooterLayout>
    </AppLayout>
  )
}

const TestApp = (props: Partial<AppLayoutProps>) => {
  const { footer } = props;
  const orderStore = OrderStore.getInstance();
  const needsAction = useState(orderStore.getNeedsAction())

  return (
      <Router basepath="/app">
        <OrdersOrganism
          path="/"
          header={<OrdersHeader text="New Orders"/>}
          content={<AppTab orders={needsAction.get()} />}
          footer={footer}
        />
        <OrderOrganism
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
  )
}
