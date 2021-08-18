import { DateTime } from "luxon";
import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { Customer } from "../../../models/customer";
import { Order } from "../../../models/orders";
import { LineItem } from "../../../models/product";
import { Restaurant } from "../../../models/restaurant";
import { Divider } from "../../layouts/divider";

export interface OrderTicketProps {
  order: Order;
  restaurant: Restaurant;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  zIndex: -5;
`;

const LineItemDivider = styled(Divider)`
  margin-top: 9px;
  border-top: 1px solid ${defaultTheme.colors.black};
  margin-bottom: 9px;
`;

const BottomDivider = styled(Divider)`
  margin-top: 100px;
  border-top: 1px solid ${defaultTheme.colors.white};
`;

export const OrderTicket = (props: OrderTicketProps) => {
  const { order, restaurant } = props;
  console.log('Rendering Order Ticket!')
  return (
    <Container id={'receipt-paper'}>
      <TicketHeader order={order} restaurant={restaurant}/>
      <CustomerInfo customer={order.customer}/>
      {
        order.lineItems.map(l => (
          <>
            <LineItemDivider />
            <TicketLineItem lineItem={l}/>
          </>
        ))
      }
      <LineItemDivider />
      <TicketTotal price={order.price}/>
      <BottomDivider />
    </Container>
  )
}

export const PrinterOrderTicket = React.forwardRef((props: OrderTicketProps) => (
  <OrderTicket {...props}/>
));


const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6px;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const HeaderText = styled.p`
  font-family: ${defaultTheme.fontFamily.hnt};
  font-size: ${defaultTheme.fontSize.xlg};
`;

const HeaderNormal = styled.p`
  font-family: ${defaultTheme.fontFamily.hnt};
  font-size: ${defaultTheme.fontSize.m};
`;

const HeaderBold = styled.p`
  font-family: ${defaultTheme.fontFamily.hnt_bold};
  font-size: ${defaultTheme.fontSize.xlg};
`;

export const TicketHeader = (props: Omit<OrderTicketProps, "reference">) => {
  const { order, restaurant } = props;

  const phoneNumber = `(${restaurant.phoneNumber.substr(0,3)})-${restaurant.phoneNumber.substr(3,3)}-${restaurant.phoneNumber.substr(6,4)}`
  return(
    <HeaderContainer>
      <HeaderContainer>
        <HeaderBold>{restaurant.name}</HeaderBold>
        <HeaderText>{phoneNumber}</HeaderText>
      </HeaderContainer>
      <HeaderContainer>
        <HeaderRow>
          <HeaderText>Order: </HeaderText>
          <HeaderBold>{` #${order.orderNumber}`}</HeaderBold>
        </HeaderRow>
        <HeaderRow>
          <HeaderNormal>{`Order placed on`} </HeaderNormal>
          <HeaderBold style={{fontSize: defaultTheme.fontSize.m, marginLeft: "4px"}}>{`${DateTime.fromISO(order.createdAt).toLocaleString(DateTime.DATETIME_FULL)}`}</HeaderBold>
        </HeaderRow>
      </HeaderContainer>
    </HeaderContainer>
  )
}


const CustomerInfoContainer = styled.div`
  border-style: solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 6px;
`;

interface CustomerInfoProps {
  customer: Customer;
 }

export const CustomerInfo = (props: CustomerInfoProps) => {
  const { customer } = props;
  return(
    <CustomerInfoContainer>
      <HeaderBold>Customer </HeaderBold>
      <HeaderText>{`Name: ${customer.firstName} ${customer.lastName}`}</HeaderText>
    </CustomerInfoContainer>
  )
}

const LineItemQuantityContainer = styled.div`
  display: flex;
  flex: 1;
  margin-right: 10px;
  max-height: 26px;
  justify-content: center;
  align-items: center;
`

const LineItemDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 8;
  margin-right: 16px;
`

const LineItemDetailHeader = styled.p`
  font-family: ${defaultTheme.fontFamily.hnt_bold};
  font-size: ${defaultTheme.fontSize.m};
  overflow-wrap: break-word;
`;

const LineItemDetailContent = styled.p`
  font-family: ${defaultTheme.fontFamily.hnt};
  font-size: ${defaultTheme.fontSize.m};
  overflow-wrap: break-word;
`;

const LineItemPrice = styled.p`
  font-family: ${defaultTheme.fontFamily.hnt};
  font-size: ${defaultTheme.fontSize.m};
  white-space: nowrap;
`;

const LineItemPriceContainer = styled.div`
  display: flex;
  flex: 2;
`

const LineItemContainer = styled.div`
  display: flex;
  flex-direction: row;
`

interface TicketLineItemProps {
  lineItem: LineItem;
}

export const TicketLineItem = (props: TicketLineItemProps) => {
  const { lineItem } = props;

  const parsedInstructions = lineItem.instructions.split('\n');

  return(
    <LineItemContainer>
      <LineItemQuantityContainer style={{ borderStyle: "solid"}}>{lineItem.quantity}</LineItemQuantityContainer>
      <LineItemDetailsContainer>
        <LineItemDetailHeader>{lineItem.mealName}</LineItemDetailHeader>
        {
          parsedInstructions.map((instruction, index) => <LineItemDetailContent key={index}>{instruction}</LineItemDetailContent>)
        }
      </LineItemDetailsContainer>
      <LineItemPriceContainer>
        <LineItemPrice>{`$${(parseFloat(lineItem.price) * lineItem.quantity).toFixed(2)}`}</LineItemPrice>
      </LineItemPriceContainer>
    </LineItemContainer>
  )
}

const TotalRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

interface TicketTotalProps {
  price: string
}

export const TicketTotal = (props: TicketTotalProps) => {
  const { price } = props;
  return(
    <TotalRow>
      <HeaderText>RESTAURANT TOTAL</HeaderText>
      <LineItemDetailHeader style={{paddingRight: "2.5%", marginLeft: "3%"}}>{`$${parseFloat(price).toFixed(2)}`}</LineItemDetailHeader>
    </TotalRow>
  )
}