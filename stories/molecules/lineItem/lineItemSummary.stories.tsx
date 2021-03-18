import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { LineItemSummary } from "../../../src/components/molecules/lineItem/lineItemSummary"
export default {
  title: "Molecules/lineItem/LineItemSummary",
} as Meta;

const Container = styled.div`
  ${layout}
`
  
  

export const LineItemCollapseComponent = () => {

  const lineItem: LineItemSummary = {
    price: "9.50",
    mealName: "Buffalo Chicken Wings",
    specialIngredient: "Bleu Cheese Dressing",
    position: 1 
  }

  return(
    <Container width={343} height={45}> 
      <LineItemSummary lineItemSummary={lineItem}/>
    </Container>
  )
}