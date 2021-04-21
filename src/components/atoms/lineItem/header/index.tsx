import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { Divider } from "../../../layouts/divider";


export interface LineItemHeaderProps {
  lineItemHeader: LineItemHeader
}

interface LineItemHeader {
  numOfItems: number;
  price: string;
}

const Container = styled.div`
  max-height: 100%;
  max-width: 100%;
  margin: 0% 0% 2% 0%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: 71%;
  height: 71%;
  width: 100%;
  max-width: 100%;
  margin: 0% 0% 4% 0;
`;

const Label = styled.p`
  font-size: ${defaultTheme.fontSize.lg};
  font-family: ${defaultTheme.fontFamily.hnt_extra_bold};
  white-space: nowrap;
  max-height: 100%;
  height: 100%;
  width: 55%;
  max-width: 55%;
  margin: 0% 23% 0% 0%;
`;

const Price = styled.p`
  font-size: ${defaultTheme.fontSize.m};
  font-family: ${defaultTheme.fontFamily.hnt_extra_bold};
  white-space: nowrap;
  max-height: 74%;
  height: 74%;
  width: 18%;
  max-width: 18%;
`;

const BottomDivider = styled(Divider)`
  border-top: 1px solid ${defaultTheme.colors.black};
  margin: 0;
`;

export const LineItemHeader = (props: LineItemHeaderProps) => {
  const { lineItemHeader:{ numOfItems, price } } = props;

  return (
    <Container>
      <TextContainer>
        <Label>{`Order (${numOfItems} ${numOfItems == 1 ? " Item" : " Items"})`}</Label>
        <Price>{`$${price}`}</Price>
      </TextContainer>
      <BottomDivider/>
    </Container>
  )
}