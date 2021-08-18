import { Meta } from "@storybook/react";
import { DateTime } from "luxon";
import React, { useRef } from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { OrderTicket } from "../../../src/components/molecules/reciept";
import { Restaurant } from "../../../src/models/restaurant";
import { MOCK_ORDERS } from "../../../src/store/mockUtils/mockOrderUtils";

export default {
  title: "Molecules/Receipt/Content",
} as Meta;

const Container = styled.div`
  ${layout}
`
const MOCK_RESTAURANT: Restaurant = {
  id: "2",
  name: "Harlem Tavern",
  description: "New York City’s Neighborhood Bar, Restaurant & Beer Garden",
  businessHours: {
    openingTime:  DateTime.fromISO('2020-08-06T09:00:00').toFormat('t'),
    closingTime: DateTime.fromISO('2020-08-06T22:00:00').toFormat('t'),
  },
  location: {
    state: "NY",
    zipCode: "10026",
    street: "2153 Fredrick Douglass Blvd",
    city: "New York"
  },
  phoneNumber: '7702394828',
}


export const PrinterTicket = () => {
  const componentRef = useRef();
  return(
    <Container width={576} height={547} reference={componentRef} >
      <OrderTicket order={MOCK_ORDERS[0]} restaurant={MOCK_RESTAURANT}/>
    </Container>
  )
}