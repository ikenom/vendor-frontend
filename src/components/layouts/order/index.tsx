import { Content, Header } from "antd/lib/layout/layout";
import React from "react";
import styled from "styled-components";
import { FooterLayout, HeaderWithContentLayout, OrganismLayoutProps } from "../orders";

const Container = styled.div`
  width: 100%;
  height: 100%
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

export const OrderOrganismLayout = (props: OrganismLayoutProps) => {
  const { header, content, footer } = props;

  return (
    <Container>
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
    </Container>
  )
}