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
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  align-items: center
`;
const SearchButton = styled(Button)`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  box-shadow: none;
`;

const TextContainer = styled.p`
  width: 41%;
  max-height: 100%;
  font-family: ${defaultTheme.fontFamily.hnt_extra_bold};
  font-style: normal;
  font-size: ${defaultTheme.fontSize.xlg};
  margin-right: 46%;
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
      <SearchButton type={"ghost"} shape={"round"} icon={<SearchIcon/>}/>
    </OrdersHeaderContainer>
  );
}

