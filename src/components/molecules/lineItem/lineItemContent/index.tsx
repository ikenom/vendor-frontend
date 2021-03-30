import React from "react";
import styled from "styled-components";
import { LineItemNotes } from "../../../atoms/lineItem/notes";
import { LineItemCollapse } from "../lineItemCollapse";
import { LineItemSummary } from "../lineItemSummary";


export interface LineItemContentProps {
  lineItemSummary: LineItemSummary;
  lineItemNote: LineItemNotes;
}

export interface LineItemsContentProps {
  lineItems: LineItemContentProps[];
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  margin: 0% 0% 2% 0%;
`;

const ListContainer = styled.div`
  overflow-y: scroll;
  webkit-overflow-scroll: touch;
  max-height: 70%;
`;

const Collapse = styled(LineItemCollapse)`
  top: 15px;
`;

const LineItemContainer = styled.div`
  margin: 4px 0px 4px 0px;
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

export const LineItemListContent = (props: LineItemsContentProps) => {
  const { lineItems } = props;
  return(
    <ListContainer>
    {lineItems.map(lineItemContent => {
      return (
        <LineItemContainer key={lineItemContent.lineItemSummary.position}>
          <LineItemContent {...lineItemContent} />
        </LineItemContainer>)
    })}
    </ListContainer>
  )
}