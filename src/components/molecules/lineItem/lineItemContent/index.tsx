import React from "react";
import styled from "styled-components";
import { LineItemNotes } from "../../../atoms/lineItem/notes";
import { LineItemCollapse } from "../lineItemCollapse";
import { LineItemSummary } from "../lineItemSummary";


export interface LineItemContentProps {
  lineItemSummary: LineItemSummary;
  lineItemNote: LineItemNotes;
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  overflow-y: scroll;
  margin: 0% 0% 2% 0%;
`;

const Collapse = styled(LineItemCollapse)`
  top: 15px;
`;


export const LineItemContent = (props: LineItemContentProps) => {
  const { lineItemSummary, lineItemNote } = props;

  return (
    <Container>
      <LineItemSummary lineItemSummary={lineItemSummary}/>
      <Collapse lineItemNote={lineItemNote}/>
    </Container>
  )
}