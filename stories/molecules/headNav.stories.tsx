import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { HeaderNav, HeaderNavWithDivider } from "../../src/components/molecules/headers/OrderHeader/HeaderNav";

export default {
  title: "Molecules/Headers/ActionHeaderNavigation",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const DefaultHeader = () => {
  return(
    <Container width={"229px"} height={"26px"}>
      <HeaderNav text="New Orders"/>
    </Container>
  )
}

export const HeaderWithDivider = () => {
  return(
    <Container width={"343px"} height={"32px"}>
      <HeaderNavWithDivider text="New Orders"/>
    </Container>
  )
}