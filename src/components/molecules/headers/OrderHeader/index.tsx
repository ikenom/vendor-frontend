import React from "react";
import styled from "styled-components";
import { HeaderContent, HeaderContentProps } from "./HeaderContent";
import { HeaderNavProps, HeaderNavWithDivider } from "./HeaderNav";

export interface OrderHeaderProps {
  navProps?: HeaderNavProps;
  contentProps: HeaderContentProps;
}

const Content = styled(HeaderContent)`
  width: 100%;
  max-height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width 100%;
`;


export const OrderHeader = (props: OrderHeaderProps) => {
  const { navProps, contentProps } = props;


  return(
    <Container>
      <HeaderNavWithDivider {...navProps}/>
      <Content {...contentProps}/>
    </Container>
  )
}
