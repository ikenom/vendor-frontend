import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { HeaderActions } from "../../src/components/molecules/headers/OrderHeader/HeaderActions"

export default {
  title: "Molecules/Headers/HeaderActions",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const DefaultHeaderActions = () => {
  return(
    <Container width={"108px"} height={"26px"}>
      <HeaderActions />
    </Container>
  )
}