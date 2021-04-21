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

const NEEDS_KITCHEN_ORDERS: Order[] = [
  {
    id: "1",
    orderNumber: "1",
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Bubba",
      lastName: "Bud"
    },
    createdAt: DateTime.now().minus({seconds: 400}).toISO(),
    price: "63.42",
    type: "TAKE OUT",
    status: "Needs Action"
  },
  {
    id: "2",
    orderNumber: "2",
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 450}).toISO(),
    price: "34.42",
    type: "TAKE OUT",
    status: "Needs Action"
  }
];

const IN_KITCHEN_ORDERS: Order[] = [
  {
    id: "4",
    orderNumber: "4",
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Sammy",
      lastName: "Smith"
    },
    createdAt: DateTime.now().minus({seconds: 1000}).toISO(),
    price: "34.42",
    type: "TAKE OUT",
    status: "In Kitchen"
  }
]

const READY_ORDERS: Order[] = [
  {
    id: "3",
    orderNumber: "3",
    lineItems: [{id: "1"}, {id: "2"}],
    customer: {
      firstName: "Bobby",
      lastName: "Larson"
    },
    createdAt: DateTime.now().minus({seconds: 700}).toISO(),
    price: "45.42",
    type: "TAKE OUT",
    status: "Ready"
  }
]

export const DefaultHeader = () => {

  const [needsActionUpdated, setNeedsActionUpdate] = useState(true);
  const [inKitchenUpdated, setInKitchenUpdate] = useState(true);
  const [readyUpdated, setReadyUpdate] = useState(true);

  const needsActionOnView = () => {
    setNeedsActionUpdate(false)
  }

  const inKitchenOnView = () => {
    setInKitchenUpdate(false)
  }

  const readyOnView = () => {
    setReadyUpdate(false)
  }

  const tabUpdates: TabUpdates = {
    needsActionUpdated: {
      isUpdated: needsActionUpdated,
      onView: needsActionOnView
    },
    inKitchenUpdated: {
      isUpdated: inKitchenUpdated,
      onView: inKitchenOnView
    },
    readyUpdated: {
      isUpdated: readyUpdated,
      onView: readyOnView
    }
  }

  return(
    <Container width={"100%"} height={648}>
      <AppTabs needsAction={NEEDS_KITCHEN_ORDERS} inKitchen={IN_KITCHEN_ORDERS} ready={READY_ORDERS} history={[]} tabUpdates={tabUpdates} isLoading={false} activeTab={"4"}/>
    </Container>
  )
}