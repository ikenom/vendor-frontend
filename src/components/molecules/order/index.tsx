import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { CancelOrderIcon } from "../../../icons/components";
import { Button } from "../../atoms/button";
import { LineItemHeader, LineItemHeaderProps } from "../../atoms/lineItem/header";
import { LineItemContent, LineItemContentProps, LineItemListContent } from "../lineItem/lineItemContent";

interface OrderContentProps {
  lineItemHeader: LineItemHeaderProps;
  lineItemsContent: LineItemContentProps[];
  button: ButtonProps;
  cancelSubmit: () => any;
}

interface ButtonProps {
  onClick: () => any;
  label?: string;
  onCancel: () => any;
}

const Container = styled.div`
  max-height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LineItemHeaderContainer = styled(LineItemHeader)`
  width: 100%;
  max-width: 100%;
`;

const LineItems = styled(LineItemListContent)`
  width: 100%;
  max-width: 100%;
  max-height: 82%;
  margin-bottom: auto;
`;

const ChangeStatusButton = styled(Button)`
  width: 100%;
  max-width: 100%;
  max-height: 10%;
  min-height: 10%;
  margin-top: auto;
  margin-bottom: 10px;
  background: ${defaultTheme.colors.blue};
`;

const CancelButton = styled(Button)`
  width: 30px;
  max-width: 30px;
  align-self: end;
  margin-left: 88%;
`;

export const OrderContent = (props: OrderContentProps) => {
  const { lineItemHeader, lineItemsContent, button: { onClick, label }, cancelSubmit } = props;

  return (
    <Container>
      <LineItemHeaderContainer {...lineItemHeader}/>
      <LineItems lineItems={lineItemsContent}/>
      <CancelButton type={"ghost"} icon={<CancelOrderIcon />} onClick={cancelSubmit}/>
      {
        label
          ? 
          <ChangeStatusButton type={"primary"} shape={"round"} onClick={onClick}>
          {label}
          </ChangeStatusButton>
          :
          <></>
      }
    </Container>
  )
}