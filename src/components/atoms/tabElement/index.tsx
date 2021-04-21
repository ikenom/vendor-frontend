import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { AttentionNeededIcon } from "../../../icons/components";

export interface TabElementProps {
  showAttentionIcon: boolean;
  text: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  position: relative;
`;

const AttentionIcon = styled(AttentionNeededIcon)`
  width: 12px;
  height: 20px;
  position: relative;
  right: 3px;
  bottom: 3px;
`;

const Text = styled.p`
  font-size: ${defaultTheme.fontSize.default};
  font-family: ${defaultTheme.fontFamily.hnt};
  width: 88%;
  height: 84%;
  margin-top: 6%;
`;

export const TabElement = (props: TabElementProps) => {
  const {showAttentionIcon, text} = props;

  return(
    <Container>
      <Text>{text}</Text>
      {
        showAttentionIcon && <AttentionIcon />
      }
    </Container>
  )
}
