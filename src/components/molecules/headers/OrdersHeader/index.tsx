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
  margin-bottom: 10px;
`;
const SearchButton = styled(Button)`
  width: 10%;
  height: 55%;
  position: relative;
  right: 5%;
  margin-top: 2%;
`;

const TextContainer = styled.p`
  width: 41%;
  max-height: 100%;
  font-family: ${defaultTheme.fontFamily.hnt};
  font-style: normal;
  font-weight: 800;
  font-size: ${defaultTheme.fontSize.xlg};
  line-height: 100%;
  margin-right: 48%;
  margin-top: 1.5%;
  margin-bottom: 0px;
  white-space: nowrap;
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

