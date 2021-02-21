import { Meta } from "@storybook/react";
import { Divider } from "../../src/components/layouts/divider"

export default {
  title: "Layouts/Divider",
} as Meta;

const Component = () => {
  return (
    <>
     <p>Text</p>
      <Divider />
      <p>Text</p>
    </>
  )
}

export const Examples = () => {
  return (
    <>
      <Component/>
    </>
  )
}