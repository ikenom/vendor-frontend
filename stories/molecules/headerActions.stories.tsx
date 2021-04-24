import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { HeaderActions } from "../../src/components/molecules/headers/OrderHeader/HeaderActions"
import { HeaderContentProps } from "../../src/components/molecules/headers/OrderHeader/HeaderContent";
import { ContentProps } from "../../src/components/molecules/modals/timeUpdateModal";

export default {
  title: "Molecules/Headers/HeaderActions",
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
      label: "label",
      content: "content"
    },
    actionProps: {
      modalType: "In Kitchen",
      modalSubmit: () => {},
      modalContentProps: modalContentProps
    }
  }
  
  return(
    <Container width={"108px"} height={"26px"}>
      <HeaderActions {...headerContentProps.actionProps} />
    </Container>
  )
}

export const HeaderActionsWithTime = () => {

  const modalContentProps:  Omit<ContentProps, "onUpdate" | "showTimeRemaining" | "initialTime"> = {
    orderDetails: {
      label: "",
      content: ""
    },
    modalType: "Extension"
  }

  const headerContentProps: HeaderContentProps = {
    labelProps: {
      label: "label",
      content: "content"
    },
    actionProps: {
      modalType: "In Kitchen",
      modalSubmit: () => {},
      modalContentProps: modalContentProps,
      timeRemainingInMinutes: 10
    }
  }
  
  return(
    <Container width={"200px"} height={"60px"}>
      <HeaderActions {...headerContentProps.actionProps} />
    </Container>
  )
}