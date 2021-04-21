import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { ArrowIcon, ProfileIcon } from "../../../../icons/components";
import { TextWithLabel } from "../../../atoms/textWithLabel";
import { Divider } from "../../../layouts/divider";
import Skeleton from 'react-loading-skeleton';
import { Button } from "../../../atoms/button";


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const OrderSummaryWithDividerContainer = styled.div<{showHoverAnimation: boolean}>`
  width: 100%;

   ${({ showHoverAnimation }) => //showHoverAnimation // Inspired by https://spectrum.chat/styled-components/general/how-to-inject-styles-using-an-on-click~1dffe25f-efc9-4194-a5cd-f641db2fa5d9
    // ? 
    // ` &:hover {
    //     cursor: pointer;
    //     box-shadow: 0px 15px 25px -5px rgba(darken(dodgerblue, 40%));
    //     transform: scale(1.03);
    //   }
    // `
    // : 
    ``
    }
    &:active {
      box-shadow: 0px 4px 8px rgba(darken(dodgerblue, 30%));
      transform: scale(.95);
    }
  }
`;

const ProfileAndTextContainer = styled.div`
  width: 35%;
  height: 71%;
  display: flex;
  flex-direction: row;
`;

const Profile = styled(ProfileIcon)`
  height: 32px;
  width: 32px;
  margin-top: 8px;
  margin-right: 10px;
`

const Arrow = styled(Button)`
  width: 20%;
  height: 57%;
  margin-top: 2px;
  margin-right: 3px;
`

const BottomDivider = styled(Divider)`
  margin-top: -2px;
`

const Price = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt};
  width: 3.5rem;
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
  margin-top: 3.7%;
`;

const SkeletonWrapper = styled(Skeleton)`
  height: 3rem;
`

export interface OrderSummaryProps {
  id: string;
  orderNumber: string;
  numOfItems: number;
  customerName: string;
  orderType: string;
  timeSinceOrderCreated: string;
  price: string;
  onClick: (orderNumber: string) => void;
}

export interface SkeletonWrapperProps {
  showSkeleton: boolean;
  orderSummaryProps: OrderSummaryProps;
}



const ProfileWithText = (props: Pick<OrderSummaryProps, "numOfItems" | "customerName">) => {
  const { numOfItems , customerName } = props;
  return(
    <ProfileAndTextContainer>
      <Profile/>
      <TextWithLabel label= {`${numOfItems} ${numOfItems == 1 ? "ITEM" : "ITEMS"}`} content={`${customerName}`} />
    </ProfileAndTextContainer>
  )
}


const PriceWithArrow = (props: Pick<OrderSummaryProps, "price" | "onClick" | "orderNumber">) => {
  const { price, onClick, orderNumber } = props;

  const navClick = () => {
    onClick(orderNumber)
  }


  return(
    <PriceWithArrowContainer>
      <Price>{`$ ${price}`}</Price>
      <Arrow type={"ghost"} shape={"circle"} icon={<ArrowIcon/>} onClick={navClick}/>
    </PriceWithArrowContainer>
  )
}

export const OrderSummary = (props: OrderSummaryProps) => {
  const { orderNumber, numOfItems , customerName, orderType, timeSinceOrderCreated, price, onClick } = props;
  return (
    <Container>
      <ProfileWithText numOfItems={numOfItems} customerName={customerName}/>
      <TextWithLabel label={`${orderType.toUpperCase()}`} content={`${timeSinceOrderCreated}`}/>
      <PriceWithArrow price={price} onClick={onClick} orderNumber={orderNumber}/>
    </Container>
  )
}

export const OrderSummaryWithDivider = (props: OrderSummaryProps) => {
  const { onClick , orderNumber } = props

  const [showHoverAnimation, setHoverAnimation] = React.useState(false);

  const navClick = () => {
    setHoverAnimation(true)
    onClick(orderNumber)
  }
  
  return(
    <OrderSummaryWithDividerContainer onClick={navClick} showHoverAnimation={showHoverAnimation} onTouchEnd={() => {setHoverAnimation(false)}}>
      <OrderSummary {...props}/>
      <BottomDivider/>
    </OrderSummaryWithDividerContainer>
  )
}


export const OrderSummarySkeletonWrapper = (props: SkeletonWrapperProps) => {
  const { showSkeleton , orderSummaryProps } = props;
  return(
    showSkeleton ?  (<SkeletonWrapper duration={.8} />) : (<OrderSummaryWithDivider {...orderSummaryProps}/>)
  )
}



