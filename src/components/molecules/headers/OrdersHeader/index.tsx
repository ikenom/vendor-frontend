import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { SearchIcon } from "../../../../icons/components";
import Button from "../../../atoms/button";

interface OrdersHeaderProps {
  orderStore?: any;
  text: string;
}


const OrdersHeaderContainer = styled.div`
  width: 100%;
  max-height: 100%;
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  flex-direction: row;
  position: relative;
`;
const SearchButton = styled(Button)`
  width: 8%;
  height: 55%;
  position: relative;
  right: 5%;
  margin-top: 1.5%;
`;

const TextContainer = styled.p`
  width: 41%;
  max-height: 100%;
  font-family: ${defaultTheme.fontFamily.hnt};
  font-style: normal;
  font-weight: 800;
  font-size: ${defaultTheme.fontSize.lg};
  line-height: 100%;
  margin-right: 53%;
  display: flex;
  margin-top: 1.5%;
  margin-bottom: 0px;
`;

export const OrdersHeader = (props: OrdersHeaderProps) => {
  const { text, orderStore } = props;

  return(
    <OrdersHeaderContainer>
      <TextContainer>
        {text}
      </TextContainer>
      <SearchButton type={"ghost"} shape={"circle"} icon={<SearchIcon/>}/>
    </OrdersHeaderContainer>
  );
}

