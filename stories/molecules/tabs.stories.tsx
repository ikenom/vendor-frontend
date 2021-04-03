import { Meta } from "@storybook/react";
import React, { useState } from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { AppTabs, TabUpdates } from "../../src/components/organisms/Tabs"
import { Order } from "../../src/models/orders";
import { DateTime } from 'luxon';
export default {
  title: "Molecules/Tabs/AppTab",
} as Meta;

const Container = styled.div`
  ${layout}
`


const ORDERS: Order[] = [
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Bubba",
      lastName: "Bud"
    },
    createdAt: DateTime.now().minus({seconds: 400}).toISO(),
    price: "63.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 450}).toISO(),
    price: "34.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Bobby",
      lastName: "Larson"
    },
    createdAt: DateTime.now().minus({seconds: 700}).toISO(),
    price: "45.42",
    type: "TAKE OUT"
  },
  {
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 1000}).toISO(),
    price: "34.42",
    type: "TAKE OUT"
  }
]

export const DefaultHeader = () => {

  const [needsActionUpdated, setNeedsActionUpdate] = useState(false);
  const [inKitchenUpdated, setInKitchenUpdate] = useState(true);
  const [readyUpdated, setReadyUpdate] = useState(true);

  const tabUpdates: TabUpdates = {
    needsActionUpdated: {
      isUpdated: needsActionUpdated,
      onView: () => setNeedsActionUpdate(false)
    },
    inKitchenUpdated: {
      isUpdated: inKitchenUpdated,
      onView: () => setInKitchenUpdate(false)
    },
    readyUpdated: {
      isUpdated: readyUpdated,
      onView: () => setReadyUpdate(false)
    }
  }

  return(
    <Container width={"100%"} height={648}>
      <AppTabs needsAction={ORDERS} inKitchen={ORDERS} ready={ORDERS} history={ORDERS} tabUpdates={tabUpdates}/>
    </Container>
  )
}