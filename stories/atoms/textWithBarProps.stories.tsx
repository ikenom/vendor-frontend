import { Meta } from "@storybook/react";
import React from "react"
import styled from "styled-components";
import { layout } from "styled-system";
import { TextWithBar } from "../../src/components/atoms/textWithDivider";

export default {
  title: "Atoms/TextWithBar",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const TextWithBarStory = () => {
  return(
    <Container width={"67px"} height={"21px"}>
      <TextWithBar text="Order #41"/>
    </Container>
  )
}