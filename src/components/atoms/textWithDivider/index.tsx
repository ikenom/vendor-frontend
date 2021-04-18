import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { Divider } from "../../layouts/divider";

interface TextWithBarProps {
  text: string;
}

const Container = styled.div`
  max-width: 100%;
`;

const Text = styled.p`
  font-size: ${defaultTheme.fontSize.default};
  font-family: ${defaultTheme.fontFamily.hnt};
  white-space: nowrap;
  width: 100%;
  height: 100%;
  font-weight: 400;
`;

const BottomDivider = styled(Divider)`
  margin-top: 2px;
  border-top: 1px solid ${defaultTheme.colors.blue};
  margin-bottom: 0;
`;

export const TextWithBar =  (props: TextWithBarProps) => {
  const { text } = props;
  return(
    <Container>
      <Text>{text}</Text>
      <BottomDivider/>
    </Container>
  )
}

export const TextWithoutBar =  (props: TextWithBarProps) => {
  const { text } = props;
  return(
    <Container>
      <Text>{text}</Text>
    </Container>
  )
}