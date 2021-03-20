import { Meta } from "@storybook/react";
import React from "react"
import styled from "styled-components";
import { layout } from "styled-system";
import { TimeDisplay } from "../../src/components/atoms/timeDisplay"

export default {
  title: "Atoms/TimeDisplay",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const Component = () => {
  return(
    <Container width={"93px"} height={"91px"}>
      <TimeDisplay minutes={10}/>
    </Container>
  )
}