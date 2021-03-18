import { Meta } from "@storybook/react";
import React from "react"
import styled from "styled-components";
import { layout } from "styled-system";
import { LineItemHeader } from "../../../src/components/atoms/lineItem/header";

export default {
  title: "Atoms/LineItem/Header",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const LineItemIndividualNote = () => {
  return(
    <Container width={"343px"} height={"49px"}>
      <LineItemHeader lineItemHeader={{numOfItems: 1, price: "9.50"}}/>
    </Container>
  )
}