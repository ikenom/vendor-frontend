import { Meta } from "@storybook/react";
import React from "react"
import styled from "styled-components";
import { layout } from "styled-system";
import { LineItemNote, LineItemNotes } from "../../../src/components/atoms/lineItem/notes";

export default {
  title: "Atoms/LineItem/Notes",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const LineItemIndividualNote = () => {
  return(
    <Container width={"218px"} height={"67px"}>
      <LineItemNote title={"Instructions"} details={"Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum"}/>
    </Container>
  )
}

export const LineItemIndividualNoteWithEllipse = () => {

  let details = "";
  for (let i = 0; i < 20; i++) {
    details = details.concat("Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum");
  }

  return(
    <Container width={"218px"} height={"80px"}>
      <LineItemNote title={"Instructions"} details={details}/>
    </Container>
  )
}

export const LineItemNotesWithEllipse = () => {

  let details = "";
  for (let i = 0; i < 20; i++) {
    details = details.concat("Lorem ipsum lorem ipsum lorem ipsum Lorem ipsum");
  }

  const lineItemNote: LineItemNotes = {
    instructions: {title: "Instructions", details},
    additionalComments: {title: "Additional Comments", details}
  }
  return(
    <Container width={"218px"} height={"120px"}>
      <LineItemNotes lineItemNote={lineItemNote}/>
    </Container>
  )
}
