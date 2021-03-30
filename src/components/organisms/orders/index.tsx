import { useState } from "@hookstate/core";
import React from "react";
import OrderStore from "../../../store/orderStore";
import { OrdersOrganismLayout } from "../../layouts/orders";
import { OrdersHeader } from "../../molecules/headers/OrdersHeader";
import { AppTabs } from "../Tabs";

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

  const needsAction = useState(orderStore.getNeedsAction())
  const inKitchen = useState(orderStore.getInKitchen())
  const ready = useState(orderStore.getReady())
  const history = useState(orderStore.getHistory())
  
  const { footer, path, location} = props;

  let selectedTab;
  if(location && location.state) {
    selectedTab = location.state.activeTab
  }
  return (
  <OrdersOrganismLayout
    path={path}
    header={<OrdersHeader text="New Orders"/>}
    content={
      <AppTabs
        needsAction={needsAction.get()}
        inKitchen={inKitchen.get()}
        ready={ready.get()}
        history={history.get()}
        activeTab={selectedTab ? selectedTab : undefined}
      />}
    footer={footer}
  />
  );
}