import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { OrdersHeader } from "../../src/components/molecules/headers/OrdersHeader"

export default {
  title: "Molecules/Headers/OrdersHeader",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const DefaultHeader = () => {
  return(
    <Container width={"100%"} height={"4%"}>
      <OrdersHeader text="New Orders"/>
    </Container>
  )
}