import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";

interface LineItemSummaryProps {
  lineItemSummary: LineItemSummary;

}

export interface LineItemSummary {
  price: string;
  mealName: string;
  specialIngredient: string; // This will 100% need to be converted to a list but doing this now for functional testing
  position: number
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const PositionLabel = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt};
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
  margin: 0% 36% 0% 0%;
`;

const MealLabel = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt};
  color: ${defaultTheme.colors.black};
  font-weight: 700;
  height: 47%;
  max-height: 47%;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  margin: 0% 0% 4% 0%;
`;

const IngredientLabel = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt};
  color: ${defaultTheme.colors.black};
  font-weight: 400;
  height: 40%;
  max-height: 40%;
  width: 85%;
  max-width: 85%;
  white-space: nowrap;
`;

const PriceLabel = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt};
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
  const { lineItemSummary : { price, mealName, specialIngredient, position }} = props

  return (
    <Container>
      <PositionLabel>{position}</PositionLabel>
      <MealContainer>
        <MealLabel>{mealName}</MealLabel>
        <IngredientLabel>{specialIngredient}</IngredientLabel>
      </MealContainer>
      <PriceLabel>{`$${price}`}</PriceLabel>
    </Container>
  )
}