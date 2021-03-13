// Ant design panel

import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import React from "react";
import { Collapse } from 'antd';

const { Panel } = Collapse;

/**
 * <Panel header="" key="1">  // Empty string!
      <p>{text}</p>
    </Panel>
 */

  interface LineItem {
    basicDetails: LineItemBaseDetails;
    instructions: string;
    additionalComments: string;
  }

  interface LineItemBaseDetails {
    label: string;
    sublabel : string; // will probably be a list at some point
    price: string;
  }

  
  interface ItemDropDownProps {
    lineItem?: LineItem;
    listPosition?: number;
  }

  const Container = styled.div`
    position: relative;
  `;

  const PositionLabel = styled.p`
    font-size: ${defaultTheme.fontSize.sm};
    font-family: ${defaultTheme.fontFamily.hnt};
    font-weight: 700;
    position: absolute;
    top: 0;
    left 0;
    max-width: 6%;
  `;

  // Need to add styles for bottom bar below arrow

  export const ItemDropDown = (props: ItemDropDownProps) => {
    return(
      <Container>
        <PositionLabel>1</PositionLabel>
        <Collapse
          onChange={() => {}}
          expandIconPosition={'right'}
          ghost
        >
          <Panel header="" key="1">
            <div>{"Empty"}</div>
          </Panel>
        </Collapse>
      </Container>
    )
  }