import { LineItemNotes } from "../../../atoms/lineItem/notes";
import { Collapse } from 'antd';
import React from "react";
import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";
import "./index.css";
import { Divider } from "../../../layouts/divider";
import { defaultTheme } from "../../../../defaultTheme";

const { Panel } = Collapse;


interface LineItemCollapseProps {
  lineItemNote: LineItemNotes;
}

const WrappedCollapse = styled(Collapse)`
  width: 100%;
  padding: 0;
  height: 100%;
  max-height: 100%;
  position: relative;
  bottom: 38px; 
  left: 10px;
`;

const WrappedPanel = styled(Panel)`
  position: relative;
  margin-left: 7%;
  width: 96%;
  padding-right: 5%;
  height: 100%;
  max-height: 100%;
`;

const TopDivider = styled(Divider)`
  border-top: 1px solid ${defaultTheme.colors.greyTwo};
  max-width: 100%;
  margin: 5% 0% 0% 0%;
`;

const NotesContainer = styled.div`
  padding: 0% 20% 0% 2.5%;
  margin: 4% 0% 0% 0%;
`;


export const LineItemCollapse = (props: LineItemCollapseProps) => {
  const { lineItemNote } = props;

  return (
    <WrappedCollapse
      onChange={() => {}}
      expandIconPosition={'right'}
      expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} />}
      ghost
    >
      <WrappedPanel header="" key="1">
        <TopDivider/>
        <NotesContainer>
          <LineItemNotes lineItemNote= {lineItemNote}/>
        </NotesContainer>
      </WrappedPanel>
    </WrappedCollapse>
  )
}