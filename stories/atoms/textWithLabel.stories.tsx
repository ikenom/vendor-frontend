import { Meta } from "@storybook/react";
import React from "react"
import styled from "styled-components";
import { TextWithLabel } from "../../src/components/atoms/textWithLabel"


export default {
  title: "Atoms/TextWithLabel",
} as Meta;

const ComponentContainer = styled.div`
  width: 51px;
  height: 35px;
  margin: 9px;
`;

const Component = () => {
  return(
    <ComponentContainer>
      <TextWithLabel label="TAKE OUT" content="10 min"/>
    </ComponentContainer>
  )
}


export const Examples = () => {
  return (
  <>
    <Component/>
  </>
  )
}