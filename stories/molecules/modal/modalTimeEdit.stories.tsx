import React from "react";
import { Meta } from "@storybook/react";
import styled from "styled-components";
import { layout } from "styled-system";
import { TimeEdit } from "../../../src/components/molecules/modalTimeEdit"

export default {
  title: "Molecules/Modal/TimeEdit",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const Component = () => {
  return (
    <Container width={330} height={493}>
      <TimeEdit onUpdate={(extendTime: number) => console.log(extendTime)}/>
    </Container>
  )
}