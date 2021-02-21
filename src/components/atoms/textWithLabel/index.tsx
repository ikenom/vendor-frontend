import React from "react"
import styled from "styled-components"
import { defaultTheme } from "../../../defaultTheme"

export interface OrderSummaryProps {
  label: string;
  content: string;
}


const Label = styled.p`
  font-size: ${defaultTheme.fontSize.xsm};
  font-family: ${defaultTheme.fontFamily.dual};
  line-height: 10px;
  margin-bottom: 4px;
  weight: 400px;
`

const Content = styled.p`
  font-size: ${defaultTheme.fontSize.sm}
  font-family: ${defaultTheme.fontFamily.hmt};
  line-height: 21px;
  weight: 400px
`


export const TextWithLabel = (props: OrderSummaryProps) => {

  const { label, content } = props
  return(
    <>
      <Label>{label}</Label>
      <Content>{content}</Content>
    </>
  )
}

export default TextWithLabel;

