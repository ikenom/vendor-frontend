import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { AppTab } from "../../src/components/molecules/Tabs"

export default {
  title: "Molecules/Tabs/AppTab",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const DefaultHeader = () => {
  return(
    <Container width={"100%"} height={648}>
      <AppTab/>
    </Container>
  )
}