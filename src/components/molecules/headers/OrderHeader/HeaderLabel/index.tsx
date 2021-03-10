import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../../defaultTheme";
import { TextWithBar } from "../../../../atoms/textWithDivider";

export interface HeaderLabelProps {
  label: string;
  content: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 32%;
`;

const Label = styled.p`
  font-size: ${defaultTheme.fontSize.lg};
  font-family: ${defaultTheme.fontFamily.hnt};
  white-space: nowrap;
  width: 100%;
  weight: 800px;
  height: 62%;
  margin-bottom: 1%;
  margin-block-end: 0px;
  margin-block-start: 0px;
`;

export const HeaderLabel = (props: HeaderLabelProps) => {
  const { label, content } = props
  return(
    <Container>
      <Label>{label}</Label>
      <TextWithBar text={content}/>
    </Container>
  )
}