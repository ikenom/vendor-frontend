import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { LineItemContent } from "../../../src/components/molecules/lineItem/lineItemContent";
export default {
  title: "Molecules/lineItem/LineItemContent",
} as Meta;

const Container = styled.div`
  ${layout}
`

let details = "";
for (let i = 0; i < 20; i++) {
  details = details.concat("Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum");
}

const lineItemNote = {
  instructions: {title: "Instructions", details},
  additionalComments: {title: "Additional Comments", details}
}

const lineItemSummary = {
  price: "9.50",
  mealName: "Buffalo Chicken Wings",
  specialIngredient: "Bleu Cheese Dressing",
  position: 1 
}
  

export const LineItemCollapseComponent = () => {
  return(
    <Container width={393} height={300}>
      <LineItemContent lineItemNote={lineItemNote} lineItemSummary={lineItemSummary}/>
    </Container>
  )
}