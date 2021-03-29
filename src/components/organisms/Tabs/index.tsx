import { Tabs } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { TabElement } from '../../atoms/tabElement';
import styled from 'styled-components';
import { NewActionTabContent, NewActionTabElement } from '../../molecules/needsAction';
import { Order } from '../../../models/orders';
import { navigate } from "gatsby";
import { useState } from '@hookstate/core';

const { TabPane } = Tabs;

interface TabProps {
  needsAction: Order[];
  inKitchen: Order[];
  ready: Order[];
  history: Order[];
}

const TabPaneContainer = styled(TabPane)`
`;

export const AppTab = (props: TabProps) => {
  const { needsAction, inKitchen, ready, history } = props;
  const activeKey = useState("1")

  const isActive = (key: string): Boolean => {
    return activeKey.get() == key
  }

  return(
    <Tabs onChange={(key) => activeKey.set(key)}>
      <TabPane tab={<TabElement text="Needs Action" showAttentionIcon={!isActive("1") && true}/>} key="1">
          <NewActionTabContent orders={needsAction} onClick={() => {navigate("/app/order")}}/>
      </TabPane>
      <TabPane tab={<TabElement text="In Kitchen" showAttentionIcon={!isActive("2")}/>} key="2">
        <NewActionTabContent orders={inKitchen} onClick={() => {navigate("/app/order")}}/>
      </TabPane>
      <TabPane tab={<TabElement text="Ready" showAttentionIcon={!isActive("3")}/>} key="3">
        <NewActionTabContent orders={ready} onClick={() => {navigate("/app/order")}}/>
      </TabPane>
      <TabPane tab={<TabElement text="History" showAttentionIcon={!isActive("4")}/>} key="4">
        <NewActionTabContent orders={history} onClick={() => {navigate("/app/order")}}/>
      </TabPane>
    </Tabs>
  )
}