import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { Button } from "../../atoms/button";
import { LineItemHeader, LineItemHeaderProps } from "../../atoms/lineItem/header";
import { LineItemContent, LineItemContentProps } from "../lineItem/lineItemContent";

interface OrderContentProps {
  lineItemHeader: LineItemHeaderProps;
  lineItemContent: LineItemContentProps;
  button: ButtonProps;
}

interface ButtonProps {
  onClick: () => any;
  label: string;
}

const Container = styled.div`
  max-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
`;

const LineItemHeaderContainer = styled(LineItemHeader)`
  width: 100%;
  max-width: 100%;
`;

const LineItems = styled(LineItemContent)`
  width: 100%;
  max-width: 100%;
  max-height: 82%;
`;

const ChangeStatusButton = styled(Button)`
  width: 100%;
  max-width: 100%;
  max-height: 8%;
  margin: 0% 0% 3% 0%;
  background: ${defaultTheme.colors.blue};
`;

export const OrderContent = (props: OrderContentProps) => {
  const { lineItemHeader, lineItemContent, button: { onClick, label } } = props;

  return (
    <Container>
      <LineItemHeaderContainer {...lineItemHeader}/>
      <LineItems {...lineItemContent}/>
      <ChangeStatusButton type={"primary"} shape={"round"} onClick={onClick}>
      {label}
      </ChangeStatusButton>
    </Container>
  )
}