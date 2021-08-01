import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import styled from "styled-components";
import { AppLayout } from "../../../pages/app";

export interface OrganismLayoutProps {
  header: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
  path: string;
}

export const HeaderWithContentLayout = styled(Layout)`
  height: 85%;
  width: 92%;
  background: transparent;
  padding: 0px;
  margin: 0px 16px 0px 16px;
`;

const OrdersHeaderLayout = styled(Header)`
  height: 9%;
  width: 100%;
  background: transparent;
  padding: 0px;
  max-height: 50px;
`;

const OrdersContentLayout = styled(Content)`
  height: 85%;
  width: 100%;
  overflow-y: scroll;
  webkit-overflow-scroll: touch;
  margin-top: 1%;
`;

export const FooterLayout = styled(Footer)`
  height: 20%;
  width: 100%;
  padding: 0px 0px 8px 0px;
  margin-top: 0%;
`;

export const DefaultOrganismLayout = (props: OrganismLayoutProps) => {
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