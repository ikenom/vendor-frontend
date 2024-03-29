import { useState } from "@hookstate/core";
import React from "react";
import { OrdersByDate, partitionOrdersByDate } from "../../../models/utils";
import OrderStore from "../../../store/orderStore";
import { DefaultOrganismLayout } from "../../layouts/orders";
import { OrdersHeader } from "../../molecules/headers/OrdersHeader";
import { AppTabs, TabUpdates } from "../Tabs";

export interface DefaultOrganismProps {
  footer: JSX.Element;
  path: string;
  location?: any;
}

interface OrderOrganismProps extends DefaultOrganismProps {
  location?: {
    state: {
      activeTab: string;
    }
  }
}

export const OrdersOrganism = (props: OrderOrganismProps) => {
  const orderStore = OrderStore.getInstance();
  const orders = useState(orderStore.getOrders());

  const needsAction = OrderStore.getNeedsAction(orders.get())
  const inKitchen = OrderStore.getInKitchen(orders.get())
  const ready = OrderStore.getReady(orders.get())
  const history = OrderStore.getHistory(orders.get())

  const isLoadingInitialData = useState(orderStore.getIsInitialLoad()).get().valueOf()

  // Check for updates
  const needsActionUpdated = useState(orderStore.needsActionUpdated).get().valueOf()
  const inKitchenUpdated = useState(orderStore.inKitchenUpdated).get().valueOf()
  const readyUpdated = useState(orderStore.readyUpdated).get().valueOf()

  const tabUpdates: TabUpdates = {
    needsActionUpdated: {
      isUpdated: needsActionUpdated,
      onView: orderStore.viewedNeedsActionUpdates
    },
    inKitchenUpdated: {
      isUpdated: inKitchenUpdated,
      onView: orderStore.viewedInKitchenUpdates
    },
    readyUpdated: {
      isUpdated: readyUpdated,
      onView: orderStore.viewedReadyUpdates
    }
  }

  const { footer, path, location} = props;

  let selectedTab;
  let title = "Orders"

  if(location && location.state) {
    selectedTab = location.state.activeTab
  }

  return (
  <DefaultOrganismLayout
    path={path}
    header={<OrdersHeader text={title}/>}
    content={
      <AppTabs
        needsAction={needsAction}
        inKitchen={inKitchen}
        ready={ready}
        history={partitionOrdersByDate(history)}
        tabUpdates={tabUpdates}
        isLoading={isLoadingInitialData}
        activeTab={selectedTab ? selectedTab : undefined}
      />}
    footer={footer}
  />
  );
}