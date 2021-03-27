import { Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import styled from "styled-components";

export interface OrganismLayoutProps {
  header: JSX.Element;
  content: JSX.Element;
  footer: JSX.Element;
  path: string;
}

const Container = styled.div`
  width: 100%;
  height: 100%
`;

export const HeaderWithContentLayout = styled(Layout)`
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
  margin-top: 1%;
`;

export const FooterLayout = styled(Footer)`
  height: 15%;
  width: 100%;
  padding: 0;
  margin-top: 0%;
`;

export const OrdersOrganismLayout = (props: OrganismLayoutProps) => {
  const { header, content, footer } = props;

  return (
    <Container>
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
    </Container>
  )
}