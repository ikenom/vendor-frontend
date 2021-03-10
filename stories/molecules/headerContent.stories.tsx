import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { HeaderContent } from "../../src/components/molecules/headers/OrderHeader/HeaderContent"

export default {
  title: "Molecules/Headers/HeaderContent",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const DefaultHeaderActions = () => {
  return(
    <Container width={"343px"} height={"174px"}>
      <HeaderContent labelProps= {{label: "Bubba B.", content:"Order #41"}}/>
    </Container>
  )
}