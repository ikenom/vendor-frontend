import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { LineItemSummary } from "../../lineItem/lineItemSummary";
import { DefaultModal, ModalHeader, ModalProps } from "../modal";


export interface CancelModalProps extends Omit<ModalProps, "title" | "content" | "buttonLabel"> {
  lineItemHeader: Omit<LineItemSummary, "price" | "position">;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`


const Header = (lineItemHeader: Omit<LineItemSummary, "price" | "position">) => {
    const { mealName } = lineItemHeader;
    return(
      <HeaderContainer>
        <ModalHeader>{mealName}</ModalHeader>
      </HeaderContainer>
    )
}

const ContentContainer = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt};
`;

const HighlightedText = styled.span`
  color: ${defaultTheme.colors.red}
`;


const Content = () => {
  return (
    <ContentContainer>
      {<HighlightedText>Refund Requested </HighlightedText>}
       if out of stock. The menu will be reflected with these changes.
    </ContentContainer>
  )
}

export const CancelModal = (props: CancelModalProps) => {
  const { isOpen, onClose, onSubmit, lineItemHeader } = props;

  return (
    <DefaultModal 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      titleComponent={Header(lineItemHeader)}
      title={""}
      content={Content()}
      buttonLabel={"Confirm"}
    />
  )
}