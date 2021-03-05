import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { ArrowIcon, ProfileIcon } from "../../../icons/components";
import { TextWithLabel } from "../../atoms/textWithLabel";
import { Divider } from "../../layouts/divider";
import { width } from 'styled-system';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Button } from "../../atoms/button";


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const OrderSummaryWithDividerContainer = styled.div`
  width: 100%;
`;

const ProfileAndTextContainer = styled.div`
  width: 29%;
  height: 71%;
  display: flex;
  flex-direction: row;
`;

const Profile = styled(ProfileIcon)`
  height: 65%;
  width: 26%;
  margin-top: 3px;
  margin-right: 14px;
`

const Arrow = styled(Button)`
  width: 20%;
  height: 57%;
  margin-top: 2%;
`

const BottomDivider = styled(Divider)`
  margin-top: 3px;
`

const TextWithLabels = styled(TextWithLabel)`
  ${width}
  margin-left: 14%;
`

const Price = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt};
  width: 67%;
  height: 100%;
  margin-top: 0px;
  margin-right: 10%;
  margin-left: 10%;
  white-space: nowrap;
`

const PriceWithArrowContainer = styled.div`
  width: 29%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-context: space-between;
  margin-top: 3.7%;
`;

const SkeletonWrapper = styled(Skeleton)`
  height: 100%;
`

export interface OrderSummaryProps {
  numOfItems: number;
  customerName: string;
  orderType: string;
  timeSinceOrderCreated: string;
  price: string;
  onClick?: () => any
}

export interface SkeletonWrapperProps {
  skeletonProps: {
    isLoading: boolean;
    showSkeleton: boolean;
  }
  orderSummaryProps: OrderSummaryProps;
}



const ProfileWithText = (props: Pick<OrderSummaryProps, "numOfItems" | "customerName">) => {
  const { numOfItems , customerName } = props;
  return(
    <ProfileAndTextContainer>
      <Profile/>
      <TextWithLabels label= {`${numOfItems} ITEMS`} content={`${customerName}`} width={"70%"}/>
    </ProfileAndTextContainer>
  )
}


const PriceWithArrow = (props: Pick<OrderSummaryProps, "price">) => {
  const { price } = props;
  return(
    <PriceWithArrowContainer>
      <Price>{`$ ${price}`}</Price>
      <Arrow type={"ghost"} shape={"circle"} icon={<ArrowIcon/>}/>
    </PriceWithArrowContainer>
  )
}

export const OrderSummary = (props: OrderSummaryProps) => {
  const { numOfItems , customerName, orderType, timeSinceOrderCreated, price } = props;
  return (
    <Container>
      <ProfileWithText numOfItems={numOfItems} customerName={customerName}/>
      <TextWithLabels label={`${orderType.toUpperCase()}`} content={`${timeSinceOrderCreated}`} width={"14%"}/>
      <PriceWithArrow price={price}/>
    </Container>
  )
}

export const OrderSummaryWithDivider = (props: OrderSummaryProps) => {
  return(
    <OrderSummaryWithDividerContainer>
      <OrderSummary {...props}/>
      <BottomDivider/>
    </OrderSummaryWithDividerContainer>
  )
}

// Need to figure out how to get the skeleton to fill the same space as component
export const OrderSummarySkeletonWrapper = (props: SkeletonWrapperProps) => {
  const { skeletonProps: { isLoading, showSkeleton }, orderSummaryProps } = props;
  return(
    showSkeleton
    ? isLoading ? (<SkeletonWrapper duration={1.3} />) : (<OrderSummaryWithDivider {...orderSummaryProps}/>)
    : (<OrderSummaryWithDivider {...orderSummaryProps}/>)
  )
}



