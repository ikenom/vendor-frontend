import { Tabs } from 'antd';
import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { TabElement } from '../../atoms/tabElement';
import styled from 'styled-components';
import { Order, OrderStatus } from '../../../models/orders';
import { navigate } from "gatsby";
import { OrdersTabView } from '../../molecules/orders/ordersView';

const { TabPane } = Tabs;

export const NEEDS_ACTION_TAB = "1";
const IN_KITCHEN_TAB = "2";
const READY_TAB = "3";
const HISTORY_TAB = "4";

interface TabProps {
  needsAction: Order[];
  inKitchen: Order[];
  ready: Order[];
  history: Order[];
  tabUpdates: TabUpdates;
  isLoading: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export interface TabUpdates {
  needsActionUpdated: TabUpdate;
  inKitchenUpdated: TabUpdate;
  readyUpdated: TabUpdate;
}

export interface TabUpdate {
  isUpdated: boolean;
  onView: () => void;
}

const TabPaneContainer = styled(TabPane)`
  margin-right: 20%;
`;

export const AppTabs = (props: TabProps) => {
  const { needsAction, inKitchen, ready, history, activeTab, tabUpdates, isLoading, onTabChange } = props;

  const { needsActionUpdated , inKitchenUpdated, readyUpdated } = tabUpdates

  const { isUpdated: needsActionIsUpdated , onView: needsActionOnView } = needsActionUpdated
  const { isUpdated: inKitchenIsUpdated , onView: inKitchenOnView } = inKitchenUpdated
  const { isUpdated: readyIsUpdated , onView: readyOnView } = readyUpdated

  const [ selectedTab, setSelectedTab ] = React.useState(activeTab);

  const updateSelectedTab = (tab: string) => {
    //onTabChange(tab);
    setSelectedTab(tab)

    if(tab === "1") {
      needsActionOnView()
    } else if (tab === "2") {
      inKitchenOnView()
    } else if (tab === "3") {
      readyOnView()
    }
  }

  return(
    <Tabs activeKey={selectedTab ? selectedTab : undefined} onChange={(tab) => updateSelectedTab(tab)}>
      <TabPaneContainer tab={<TabElement text="Needs Action" showAttentionIcon={needsActionIsUpdated}/>} key={NEEDS_ACTION_TAB}>
        <OrdersTabView orders={needsAction} isLoading={isLoading} onClick={(orderNumber) => {navigate(`/app/${orderNumber}`, {state: {status: "Needs Action"}})}}/>
      </TabPaneContainer>
      <TabPane tab={<TabElement text="In Kitchen" showAttentionIcon={inKitchenIsUpdated}/>} key={IN_KITCHEN_TAB}>
        <OrdersTabView orders={inKitchen} isLoading={isLoading} onClick={(orderNumber) => {navigate(`/app/${orderNumber}`, {state: {status: "In Kitchen"}})}}/>
      </TabPane>
      <TabPane tab={<TabElement text="Ready" showAttentionIcon={readyIsUpdated}/>} key={READY_TAB}>
        <OrdersTabView orders={ready} isLoading={isLoading} onClick={(orderNumber) => {navigate(`/app/${orderNumber}`, {state: {status: "Ready"}})}}/>
      </TabPane>
      <TabPane tab={<TabElement text="History" showAttentionIcon={false}/>} key={HISTORY_TAB}>
        <OrdersTabView orders={history} isLoading={isLoading} onClick={(orderNumber) => {navigate(`/app/${orderNumber}`, {state: {status: "History"}})}}/>
      </TabPane>
    </Tabs>
  )
}

export const getActiveTabFromOrderStatus = (status: OrderStatus): string => {
  switch(status) {
    case "Needs Action": {
      return NEEDS_ACTION_TAB
    }
    case "In Kitchen": {
      return IN_KITCHEN_TAB
    }
    case "Ready": {
      return READY_TAB
    }
    case "History": {
      return HISTORY_TAB
    }
  }
}

export const getOrderStatusFromActiveTab = (tab: string): OrderStatus => {
  switch(tab) {
    case "1": {
      return "Needs Action"
    }
    case "2": {
      return "In Kitchen"
    }
    case "3": {
      return "Ready"
    }
    case "4": {
      return "History"
    }
  }
}