import { useState } from "@hookstate/core";
import React from "react";
import OrderStore from "../../../store/orderStore";
import { OrdersOrganismLayout } from "../../layouts/orders";
import { OrdersHeader } from "../../molecules/headers/OrdersHeader";
import { AppTabs, TabUpdates } from "../Tabs";

interface OrdersOrganismProps {
  footer: JSX.Element;
  path: string;
  location?: {
    state: {
      activeTab: string;
    }
  }
}

export const OrdersOrganism = (props: OrdersOrganismProps) => {
  const orderStore = OrderStore.getInstance();

  const needsAction = useState(orderStore.getNeedsAction());
  const inKitchen = useState(orderStore.getInKitchen());
  const ready = useState(orderStore.getReady());
  const history = useState(orderStore.getHistory());

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
  <OrdersOrganismLayout
    path={path}
    header={<OrdersHeader text={title}/>}
    content={
      <AppTabs
        needsAction={needsAction.get()}
        inKitchen={inKitchen.get()}
        ready={ready.get()}
        history={history.get()}
        tabUpdates={tabUpdates}
        isLoading={isLoadingInitialData}
        activeTab={selectedTab ? selectedTab : undefined}
      />}
    footer={footer}
  />
  );
}