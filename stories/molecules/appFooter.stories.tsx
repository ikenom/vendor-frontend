import React from "react";
import { Meta } from "@storybook/react";
import styled from "styled-components";
import { layout } from "styled-system";
import { AppFooter, FooterIcons } from "../../src/components/molecules/AppFooter"

export default {
  title: "Molecules/AppFooter",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const DefaultAppFooter = () => {
  return (<Container width={375} height={75}>
    <AppFooter 
      selectedIcon="order" 
      onClicks={{
        ordersOnClick: () => {},
        inventoryOnClick: () => {},
        supportClick: () => {},
        profileOnClick: () => {}
      }} />
  </Container>)
}

export const DefaultAppFooterIcons = () => {
  return (<Container width={375} height={75}>
    <FooterIcons 
      selectedIcon="order" 
      onClicks={{
        ordersOnClick: () => {},
        inventoryOnClick: () => {},
        supportClick: () => {},
        profileOnClick: () => {}
      }} />
  </Container>)
}