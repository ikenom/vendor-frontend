import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { ArrowIcon, ProfileIcon } from "../../../icons/components";
import { TextWithLabel } from "../../atoms/textWithLabel";
import { Divider } from "../../layouts/divider";


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ProfileAndTextContainer = styled.div`
  width: 29%;
  height: 71%;
  display: flex;
  flex-direction: row;
`;

const Profile = styled(ProfileIcon)`
  height: 65%;
  width: 23%;
  margin-top: 6px;
  margin-right: 14px;
`

const Arrow = styled(ArrowIcon)`
  width: 20%;
  height: 57%
`

const BottomDivider = styled(Divider)`
  margin-top: 5px;
`

const TextWithLabels = styled(TextWithLabel)<{widthInPercent: number}>`
  width: ${({widthInPercent}) => `${widthInPercent}%`}
`

const Price = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hmt};
  width: 67%;
  height: 100%;
  margin-top: 0px;
`

const PriceWithArrowContainer = styled.div`
  width: 23%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-context: space-between;
  margin-top: 18px;
`;

export interface OrderSummaryProps {
  numOfItems: number;
  customerName: string;
  orderType: string;
  timeSinceOrderCreated: string;
  price: string;
  onClick?: () => any
}



const ProfileWithText = (props: Pick<OrderSummaryProps, "numOfItems" | "customerName">) => {
  const { numOfItems , customerName } = props;
  return(
    <ProfileAndTextContainer>
      <Profile/>
      <TextWithLabels label= {`${numOfItems} ITEMS`} content={`${customerName}`} widthInPercent={18}/>
    </ProfileAndTextContainer>
  )
}

const PriceWithArrow = (props: Pick<OrderSummaryProps, "price">) => {
  const { price } = props;
  return(
    <PriceWithArrowContainer>
      <Price>{`$ ${price}`}</Price>
      <Arrow/>
    </PriceWithArrowContainer>
  )
}

export const OrderSummary = (props: OrderSummaryProps) => {
  const { numOfItems , customerName, orderType, timeSinceOrderCreated, price } = props;
  return (
    <Container>
      <ProfileWithText numOfItems={numOfItems} customerName={customerName}/>
      <TextWithLabels label={`${orderType.toUpperCase()}`} content={`${timeSinceOrderCreated}`} widthInPercent={14}/>
      <PriceWithArrow price={price}/>
    </Container>
  )
}

export const OrderSummaryWithDivider = (props: OrderSummaryProps) => {
  return(
    <>
      <OrderSummary {...props}/>
      <BottomDivider/>
    </>
  )
}



