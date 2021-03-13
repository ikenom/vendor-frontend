import { LineItemNotes } from "../../../atoms/lineItem/notes";
import { Collapse } from 'antd';
import React from "react";
import styled from "styled-components";
import "./index.css";

const { Panel } = Collapse;


interface LineItemCollapseProps {
  lineItemNote: LineItemNotes;
}

const WrappedCollapse = styled(Collapse)`
  width: 100%;
  padding: 0;
  height: 100%;
  max-height: 100%;
`;

const WrappedPanel = styled(Panel)`
  position: relative;
  margin-left: 7%;
  max-width: 63%;
  margin-right: 29%;
  height: 100%;
  max-height: 100%;
`;

export const LineItemCollapse = (props: LineItemCollapseProps) => {
  const { lineItemNote } = props;

  return (
    <WrappedCollapse
      onChange={() => {}}
      expandIconPosition={'right'}
      ghost
    >
      <WrappedPanel header="" key="1">
        <LineItemNotes lineItemNote= {lineItemNote}/>
      </WrappedPanel>
    </WrappedCollapse>
  )
}