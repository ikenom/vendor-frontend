import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { LineItemNotes } from "../../../src/components/atoms/lineItem/notes";
import { LineItemCollapse } from "../../../src/components/molecules/lineItem/lineItemCollapse"
export default {
  title: "Molecules/lineItem/LineItemCollapse",
} as Meta;

const Container = styled.div`
  ${layout}
`

let details = "";
  for (let i = 0; i < 20; i++) {
    details = details.concat("Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum");
  }

  const lineItemNote: LineItemNotes = {
    instructions: {title: "Instructions", details},
    additionalComments: {title: "Additional Comments", details}
  }
  

export const LineItemCollapseComponent = () => {
  return(
    <Container width={343} height={200}>
      <LineItemCollapse lineItemNote={lineItemNote}/>
    </Container>
  )
}