import React from "react";
import styled from "styled-components";
import { ReactComponent as ProfileLogo } from '../../../icons/svg/xIcon.svg'


const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const ProfileIcon = styled(ProfileLogo)`
  width: 100%;
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

export const OrderSummary = (props: OrderSummaryProps) => {
  return (
    <Container>
      <ProfileIcon/>
    </Container>
  )
}



