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

const HeaderSubText = styled.p`
  font-size: ${defaultTheme.fontSize.lg};
  font-family: ${defaultTheme.fontFamily.hnt};
  font-weight: 700;
  color: ${defaultTheme.colors.greyTwo}
`;

const Header = (lineItemHeader: Omit<LineItemSummary, "price" | "position">) => {
    const { mealName , specialIngredient } = lineItemHeader
    return(
      <HeaderContainer>
        <ModalHeader>{mealName}</ModalHeader>
        <HeaderSubText>{specialIngredient}</HeaderSubText>
      </HeaderContainer>
    )
}

const ContentContainer = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt};
  font-weight: 400;
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