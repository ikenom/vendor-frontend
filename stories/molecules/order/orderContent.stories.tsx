import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { LineItemHeaderProps } from "../../../src/components/atoms/lineItem/header";
import { LineItemNotes } from "../../../src/components/atoms/lineItem/notes";
import { LineItemContentProps } from "../../../src/components/molecules/lineItem/lineItemContent";
import { OrderContent } from "../../../src/components/molecules/order"


export default {
  title: "Molecules/Order/OrderContent",
} as Meta;

const Container = styled.div`
  ${layout}
`

let details = "";
for (let i = 0; i < 20; i++) {
  details = details.concat("Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum");
}

const lineItemNote: LineItemNotes = {
  instructions: "Instructions",
  additionalComments: {title: "Additional Comments", details}
}

const lineItemSummary = {
  price: "9.50",
  mealName: "Buffalo Chicken Wings",
  specialIngredient: "Bleu Cheese Dressing",
  position: 1 
}

const lineItemContent: LineItemContentProps = {
  lineItemSummary,
  lineItemNote,
  unavailableOnClick: () => {}
}

const lineItemHeader: LineItemHeaderProps = {
  lineItemHeader: {
    numOfItems: 1, 
    price: "9.50"
  }
}

const buttonProps = {
  onClick: () => {},
  label: "Send To Kitchen",
  onCancel: () => {}
}

export const LineItemCollapseComponent = () => {
  return(
    <Container width={343} height={547}>
      <OrderContent 
        lineItemsContent={[lineItemContent]} 
        lineItemHeader={lineItemHeader}
        button={buttonProps}
        cancelSubmit={() => {}}
      />
    </Container>
  )
}