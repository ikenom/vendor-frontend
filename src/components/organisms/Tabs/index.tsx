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

  const { needsActionUpdated, inKitchenUpdated, readyUpdated } = tabUpdates

  const [ selectedTab, setSelectedTab ] = React.useState(activeTab);

  const updateSelectedTab = (tab: string) => {
    //onTabChange(tab);
    setSelectedTab(tab)
    switch(tab) {
      case(NEEDS_ACTION_TAB): { needsActionUpdated.onView() }
      case(IN_KITCHEN_TAB): { inKitchenUpdated.onView() }
      case(READY_TAB): { readyUpdated.onView() }
      default:{}
    }
  }

  return(
    <Tabs activeKey={selectedTab ? selectedTab : undefined} onChange={(tab) => updateSelectedTab(tab)}>
      <TabPaneContainer tab={<TabElement text="Needs Action" showAttentionIcon={needsActionUpdated.isUpdated}/>} key={NEEDS_ACTION_TAB}>
        <OrdersTabView orders={needsAction} isLoading={isLoading} onClick={(orderNumber) => {navigate(`/app/${orderNumber}`, {state: {status: "Needs Action"}})}}/>
      </TabPaneContainer>
      <TabPane tab={<TabElement text="In Kitchen" showAttentionIcon={inKitchenUpdated.isUpdated}/>} key={IN_KITCHEN_TAB}>
        <OrdersTabView orders={inKitchen} isLoading={isLoading} onClick={(orderNumber) => {navigate(`/app/${orderNumber}`, {state: {status: "In Kitchen"}})}}/>
      </TabPane>
      <TabPane tab={<TabElement text="Ready" showAttentionIcon={readyUpdated.isUpdated}/>} key={READY_TAB}>
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