import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { TabElement } from "../../src/components/atoms/tabElement"

export default {
  title: "Atoms/TabElement",
  argTypes: {
    showAttentionIcon: { control: "boolean"},
    text: {control: "text"}
  }
} as Meta;

const IconContainer = styled.div`
  width: 96px;
  height: 89px;
`;

export const DefaultTabElement = (args) => {
  return(
    <IconContainer>
      <TabElement {...args}/>
    </IconContainer>
  )
}

DefaultTabElement.args = {
  text: "Needs Action",
  showAttentionIcon: true
}
