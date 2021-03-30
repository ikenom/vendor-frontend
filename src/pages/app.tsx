import * as React from "react";
import { useEffect } from "react";
import { AppFooter } from "../components/molecules/AppFooter";
import { Router } from "@reach/router";
import { disableBodyScroll } from "body-scroll-lock";

import styled, { createGlobalStyle } from 'styled-components'
import { Layout } from "antd";
import { OrdersOrganism } from "../components/organisms/orders";
import { OrderOrganism } from "../components/organisms/order";
import { defaultTheme } from "../defaultTheme";



const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    padding: 30px 0px 0px 0px;
  }

  @supports (padding: max(0px)) {
    /* CSS specific to iOS devices */
    body {
      padding-top: max(20px, env(safe-area-inset-top));
      padding-bottom: max(20px, env(safe-area-inset-bottom));
    }
  }
`


const AppPage = () => {
  return (
    <App />
  )
};

export default AppPage;

const App = () => {
  // Disables scrolling of App
  useEffect(() => {
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    disableBodyScroll(document.body);
  }, []);

  return (
    <>
      <GlobalStyle />
      <TestApp footer={<AppFooter selectedIcon="order"/>}
    />
    </>
  )
};

export const AppLayout = styled(Layout)`
  width: 100%;
  max-width: 700px;
  overflow: hidden;
  max-height: 95vh;
  min-height: 95vh;
  background-color: ${defaultTheme.colors.white};
`;

export interface AppLayoutProps {
  header: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
}


const TestApp = (props: Omit<AppLayoutProps, "content" | "header">) => {
  const { footer } = props;

  return (
    <AppLayout>
      <Router basepath="/app">
          <OrdersOrganism footer={footer}  path={"/"}/>
          <OrderOrganism path="/:orderNumber" footer={footer}/>
      </Router>
    </AppLayout>
  )
}
