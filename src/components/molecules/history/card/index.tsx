import { DateTime } from "luxon";
import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { Order } from "../../../../models/orders";
import { getDayOfWeekAsText, orderToOrderSummaryAdapter } from "../../../../models/utils";
import { OrderSummaryList } from "../../orders/orderSummaryList";

export interface HistoryCardProps {
  label: DateTime;
  orders: Order[]; 
  onClick: (orderNumber: string) => any;
  isLoading: boolean;
}

const Container = styled.div`
  padding-bottom: 8px;
`;

const HeaderLayout = styled.div`
  position: relative;
  width: 100vw;
  overflow-y: auto;
  background-color: ${defaultTheme.colors.greyFour};
  padding: 10px 0px 10px 16px;
  margin-bottom: 20px;
`;

const HeaderContainer = styled.p`
  font-family: ${defaultTheme.fontFamily.hnt_bold};
  font-size: 16px;
`;

export const HistoryCard = (props: HistoryCardProps) => {
  const { label, orders, onClick, isLoading } = props;

  const dayOfWeek = getDayOfWeekAsText(label.weekday);
  const date = label.toFormat('MMM dd');

  const orderSummaries = orders.map(order => orderToOrderSummaryAdapter(order));
  return(
    <Container>
      <HeaderLayout>
        <HeaderContainer>{`${dayOfWeek}, ${date}`}</HeaderContainer>
      </HeaderLayout>
      <OrderSummaryList orderSummaries={orderSummaries} onClick={onClick} isLoading={isLoading} displayTime={true}/>
    </Container>
  )
}