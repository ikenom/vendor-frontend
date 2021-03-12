import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { HeaderLabel } from "../../src/components/molecules/headers/OrderHeader/HeaderLabel"

export default {
  title: "Molecules/Headers/HeaderLabel",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const DefaultHeaderActions = () => {
  return(
    <Container width={"108px"} height={"26px"}>
      <HeaderLabel label={"Bubba B."} content={"Order #41"}/>
    </Container>
  )
}