import React from "react";
import styled from "styled-components";
import { LineItemNotes } from "../../../atoms/lineItem/notes";
import { Divider } from "../../../layouts/divider";
import { LineItemCollapse } from "../lineItemCollapse";
import { LineItemSummary } from "../lineItemSummary";


export interface LineItemContentProps {
  lineItemSummary: LineItemSummary;
  lineItemNote: LineItemNotes;
  occurrences?: number;
  unavailableOnClick: (id: string) => any;
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
  overflow-x: hidden;
  webkit-overflow-scroll: touch;
  max-height: 70%;
`;

const Collapse = styled(LineItemCollapse)`
  top: 15px;
`;

const LineItemContainer = styled.div`
  margin: 4px 0px 4px 0px;
`;

const BottomDivider = styled(Divider)`
  margin: .75% 35% 0% 0%;
  border-top: 1px solid #A0A0A0;
`


export const LineItemContent = (props: LineItemContentProps) => {
  const { lineItemSummary, lineItemNote, unavailableOnClick } = props;

  return (
    <Container>
      <LineItemSummary lineItemSummary={{...lineItemSummary, occurrences: props.occurrences}}/>
      <Collapse lineItemNote={lineItemNote} unavailableOnSubmit={unavailableOnClick} mealName={lineItemSummary.mealName}/>
      <BottomDivider />
    </Container>
  )
}

export const LineItemListContent = (props: LineItemsContentProps) => {
  const { lineItems } = props;
  return(
    <ListContainer>
    {lineItems.map(lineItemContent => {
      return (
        <LineItemContainer key={lineItemContent.occurrences}>
          <LineItemContent {...lineItemContent} />
        </LineItemContainer>)
    })}
    </ListContainer>
  )
}