import { Tabs } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { TabElement } from '../../atoms/tabElement';
import styled from 'styled-components';

const { TabPane } = Tabs;

interface TabProps {

}

const TabPaneContainer = styled(TabPane)`
border: "transparent";
borderColor: "transparent";
`;

export const AppTab = (props: TabProps) => {
  return(
    <Tabs >
      <TabPaneContainer tab={<TabElement text="Needs Action" showAttentionIcon={true}/>} key="1">
        Content of Tab Pane 1
      </TabPaneContainer>
      <TabPane tab={<TabElement text="In Kitchen" showAttentionIcon={false}/>} key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab={<TabElement text="Ready" showAttentionIcon={false}/>} key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab={<TabElement text="History" showAttentionIcon={false}/>} key="3">
      Content of Tab Pane 4
      </TabPane>
    </Tabs>
  )
}