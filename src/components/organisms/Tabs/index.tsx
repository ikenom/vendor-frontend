import { Tabs } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { TabElement } from '../../atoms/tabElement';
import styled from 'styled-components';
import { Order } from '../../../models/orders';
import { navigate } from "gatsby";
import { OrdersTabView } from '../../molecules/orders/ordersView';

const { TabPane } = Tabs;

interface TabProps {
  needsAction: Order[];
  inKitchen: Order[];
  ready: Order[];
  history: Order[];

}

const TabPaneContainer = styled(TabPane)`
  margin-right: 20%;
`;

export const AppTabs = (props: TabProps) => {
  const { needsAction, inKitchen, ready, history } = props;

  return(
    <Tabs >
      <TabPaneContainer tab={<TabElement text="Needs Action" showAttentionIcon={false}/>} key="1">
        <OrdersTabView orders={needsAction} onClick={(orderNumber) => {navigate(`/app/${orderNumber}`, {state: {status: "Needs Action"}})}}/>
      </TabPaneContainer>
      <TabPane tab={<TabElement text="In Kitchen" showAttentionIcon={false}/>} key="2">
        <OrdersTabView orders={inKitchen} onClick={(orderNumber) => {navigate(`/app/${orderNumber}`, {state: {status: "In Kitchen"}})}}/>
      </TabPane>
      <TabPane tab={<TabElement text="Ready" showAttentionIcon={false}/>} key="3">
        <OrdersTabView orders={ready} onClick={(orderNumber) => {navigate(`/app/${orderNumber}`, {state: {status: "Ready"}})}}/>
      </TabPane>
      <TabPane tab={<TabElement text="History" showAttentionIcon={false}/>} key="4">
        <OrdersTabView orders={history} onClick={(orderNumber) => {navigate(`/app/${orderNumber}`, {state: {status: "History"}})}}/>
      </TabPane>
    </Tabs>
  )
}