import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { Divider } from "../../../layouts/divider";


interface LineItemHeaderProps {
  lineItemHeader: LineItemHeader
}

interface LineItemHeader {
  numOfItems: number;
  price: string;
}

const Container = styled.div`
  max-height: 100%;
  max-width: 100%;
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
  font-family: ${defaultTheme.fontFamily.hnt};
  white-space: nowrap;
  font-weight: 800;
  max-height: 100%;
  height: 100%;
  width: 55%;
  max-width: 55%;
  margin: 0% 40% 0% 0%;
`;

const Price = styled.p`
  font-size: ${defaultTheme.fontSize.m};
  font-family: ${defaultTheme.fontFamily.hnt};
  white-space: nowrap;
  font-weight: 800;
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
        <Label>{`Order (${numOfItems} ${numOfItems == 1 ? "Items" : "Item"})`}</Label>
        <Price>{`$${price}`}</Price>
      </TextContainer>
      <BottomDivider/>
    </Container>
  )
}