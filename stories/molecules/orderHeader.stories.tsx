import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { OrderHeader } from "../../src/components/molecules/headers/OrderHeader"
export default {
  title: "Molecules/Headers/OrderHeader",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const DefaultHeaderActions = () => {
  return(
    <Container width={343} height={230}>
      <OrderHeader 
        navProps={{text: "New Orders"}}
        contentProps={{ labelProps: { label: "Bubba B.", content: "Order #41" }}}
      />
    </Container>
  )
}