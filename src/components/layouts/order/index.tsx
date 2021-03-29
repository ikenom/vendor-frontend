import { Content, Header } from "antd/lib/layout/layout";
import React from "react";
import styled from "styled-components";
import { AppLayout } from "../../../pages/app";
import { FooterLayout, HeaderWithContentLayout, OrganismLayoutProps } from "../orders";


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