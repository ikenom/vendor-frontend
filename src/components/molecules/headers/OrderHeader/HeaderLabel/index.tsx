import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../../defaultTheme";
import { TextWithBar, TextWithoutBar } from "../../../../atoms/textWithDivider";

export interface HeaderLabelProps {
  label: string;
  content: string;
  withoutBar?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 44%;
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
  font-weight: 700;
`;

export const HeaderLabel = (props: HeaderLabelProps) => {
  const { label, content, withoutBar } = props
  return(
    <Container>
      <Label>{label}</Label>
      {
        withoutBar ? 
        <TextWithoutBar text={content}/> :
        <TextWithBar text={content}/>
      }
    </Container>
  )
}
