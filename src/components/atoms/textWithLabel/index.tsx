import React from "react"
import styled from "styled-components"
import { defaultTheme } from "../../../defaultTheme"

export interface TextWithLabelProps {
  label: string;
  content: string;
}

const Container = styled.div``


const Label = styled.p`
  font-size: ${defaultTheme.fontSize.xsm};
  font-family: ${defaultTheme.fontFamily.dual_sm};
  line-height: 10px;
  margin-bottom: 6px;
  margin-top: 0px;
`

const Content = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt};
  line-height: 21px;
  margin-top: 0px;
  white-space: nowrap;
`


export const TextWithLabel = (props: TextWithLabelProps) => {

  const { label, content } = props;
  return(
    <Container>
      <Label>{label}</Label>
      <Content>{content}</Content>
    </Container>
  )
}

export default TextWithLabel;

