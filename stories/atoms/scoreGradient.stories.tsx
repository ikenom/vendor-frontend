import React from "react";
import { Meta } from "@storybook/react";
import { ScoreGradient } from "../../src/components/atoms/score"

export default {
  title: "Atoms/ScoreGradient",
} as Meta;


export const Gradient = () => {
  return(
    <>
      <ScoreGradient style={{width: "100px", height: "5px"}} />
    </>
  )
}