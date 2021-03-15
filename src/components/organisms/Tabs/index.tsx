import { Tabs } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { TabElement } from '../../atoms/tabElement';
import styled from 'styled-components';
import { NewActionTabContent, NewActionTabElement } from '../../molecules/needsAction';
import { Order } from '../../../models/orders';
import { navigate } from "gatsby";

const { TabPane } = Tabs;

interface TabProps {
  orders: Order[];
}

const TabPaneContainer = styled(TabPane)`
`;

export const AppTab = (props: TabProps) => {
  const { orders } = props;
  return(
    <Tabs >
      <TabPaneContainer tab={<NewActionTabElement />} key="1">
        <NewActionTabContent orders={orders} onClick={() => {navigate("/app/order")}}/>
      </TabPaneContainer>
      <TabPane tab={<TabElement text="In Kitchen" showAttentionIcon={false}/>} key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab={<TabElement text="Ready" showAttentionIcon={false}/>} key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab={<TabElement text="History" showAttentionIcon={false}/>} key="4">
      Content of Tab Pane 4
      </TabPane>
    </Tabs>
  )
}