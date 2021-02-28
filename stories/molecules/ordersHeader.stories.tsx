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
    <Container width={375} height={35}>
      <OrdersHeader text="New Orders"/>
    </Container>
  )
}