import * as React from "react";
import { useEffect } from "react";
import { AppFooter, FooterOnClicks } from "../components/molecules/AppFooter";
import { Router } from "@reach/router";
import { disableBodyScroll } from "body-scroll-lock";
import { useLocation } from "@reach/router"

import styled, { createGlobalStyle } from 'styled-components'
import { Layout } from "antd";
import { OrdersOrganism } from "../components/organisms/orders";
import { OrderOrganism } from "../components/organisms/order";
import { defaultTheme } from "../defaultTheme";
import { startup } from "../startup";
import "./index.css";
import { navigate } from "gatsby";


const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-family: "Helvetica Now Text", "Helvetica Now Text Light" , "Helvetica Now Text Medium", "Helvetica Now Text Bold", "Helvetica Now Text Extra Bold", "Helvetica Now Text Black", "Dual-300", "Dual-600";
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

const footerNavigators: FooterOnClicks = {
  ordersOnClick: () => {
    const location = useLocation();

    if(location.pathname.includes("order")) {
      // Do nothing
      return;
    }
    navigate(`/app/order`)
  },
  profileOnClick: () => {
    const location = useLocation();

    if(location.pathname.includes("profile")) {
      // Do nothing
      return;
    }
    navigate(`/app/profile`)
  },
  inventoryOnClick: undefined,
  supportOnClick: undefined
}


const AppPage = () => {
  
  return (
    <App />
  )
};

export default AppPage;

const App = () => {
  React.useLayoutEffect(() => {
    startup()
  })

  // Disables scrolling of App view port
  useEffect(() => {
    document.getElementsByTagName("html")[0].style.overflow = "hidden";
    disableBodyScroll(document.body);
  }, []);

  // Refresh app every 30 seconds so that data involving time is always fresh
  
  const [, updateState] = React.useState<any>();
  
  const forceUpdate = React.useCallback(() => updateState({}), []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate()
    }, 30000);

    return () => clearInterval(interval);
  }, [])

  return (
    <>
      <GlobalStyle />
      <AppComponent footer={<AppFooter selectedIcon="order"/>}
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


const AppComponent = (props: Omit<AppLayoutProps, "content" | "header">) => {
  const { footer } = props;

  return (
    <AppLayout>
      <Router basepath="/app">
          <OrdersOrganism footer={footer}  path={"/order"}/>
          <OrderOrganism path="/order/:orderNumber" footer={footer}/>
      </Router>
    </AppLayout>
  )
}
