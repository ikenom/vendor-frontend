import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { HeaderContent, HeaderContentProps } from "../../src/components/molecules/headers/OrderHeader/HeaderContent"
import { ContentProps } from "../../src/components/molecules/modals/timeUpdateModal";

export default {
  title: "Molecules/Headers/HeaderContent",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const DefaultHeaderActions = () => {
  const modalContentProps:  Omit<ContentProps, "onUpdate" | "showTimeRemaining" | "initialTime"> = {
    orderDetails: {
      label: "",
      content: ""
    },
    modalType: "Extension"
  }

  const headerContentProps: HeaderContentProps = {
    labelProps: {
      label: "Bubba B.",
      content: "Order #41"
    },
    actionProps: {
      modalType: "In Kitchen",
      modalSubmit: () => {},
      modalContentProps: modalContentProps
    }
  }
  return(
    <Container width={"343px"} height={"174px"}>
      <HeaderContent {...headerContentProps}/>
    </Container>
  )
}