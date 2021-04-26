import { Content, Header } from "antd/lib/layout/layout";
import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { AppLayout } from "../../../pages/app";
import { FooterLayout, HeaderWithContentLayout, OrganismLayoutProps } from "../orders";



const OrderHeaderLayout = styled(Header)`
  height: 23%;
  width: 100%;
  background-color: transparent;
  padding: 0px;
  z-index: 1;
`;

const Background = styled.div`
  background-color: ${defaultTheme.colors.greyFour};
  width: 100vh;
  position: fixed;
  z-index: 0;
  left: 0;
  top: 0;
  height: 21.5%;
`;

const OrderContentLayout = styled(Content)`
  height: 77%;
  max-height: 85%;
  width: 100%;
  margin-top: 8%;
  display: flex;
`;


export const OrderOrganismLayout = (props: OrganismLayoutProps) => {
  const { header, content, footer } = props;

  return (
    <AppLayout>
      <HeaderWithContentLayout>
        <OrderHeaderLayout>
          {header}
        </OrderHeaderLayout>
        <Background />
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