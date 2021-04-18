import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";

interface LineItemSummaryProps {
  lineItemSummary: LineItemSummary;
}

export interface LineItemSummary {
  price: string;
  mealName: string;
  position: number
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const PositionLabel = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt_bold};
  color: ${defaultTheme.colors.black};
  font-weight: 700;
  height: 47%;
  max-height: 47%;
  width: 3%;
  max-width: 3%;
  white-space: nowrap;
  margin: 0% 6% 0% 0%;
`;

const MealContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 43%;
  max-width: 43%;
  height: 100%;
  max-height: 100%;
  margin: 0% 27% 0% 0%;
`;

const MealLabel = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt_bold};
  color: ${defaultTheme.colors.black};
  font-weight: 700;
  height: 47%;
  max-height: 47%;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  margin: 0% 0% 0% 0%;
`;

const PriceLabel = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt_bold};
  color: ${defaultTheme.colors.black};
  font-weight: 700;
  height: 47%;
  max-height: 47%;
  width: 12%;
  max-width: 12%;
  white-space: nowrap;
  margin: 0;
`;

export const LineItemSummary = (props: LineItemSummaryProps) => {
  const { lineItemSummary : { price, mealName, position }} = props

  return (
    <Container>
      <PositionLabel>{position}</PositionLabel>
      <MealContainer>
        <MealLabel>{mealName}</MealLabel>
      </MealContainer>
      <PriceLabel>{`$${price}`}</PriceLabel>
    </Container>
  )
}