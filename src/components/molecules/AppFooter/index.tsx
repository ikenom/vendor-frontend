import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { SelectableIcon, SelectableIcons } from "../../../icons/components";
import Button from "../../atoms/button";
import "./index.css";

export interface AppFooterProps {
  selectedIcon: SelectableIcons;
  onClicks?: FooterOnClicks;
}

export interface FooterOnClicks {
  ordersOnClick: () => any;
  inventoryOnClick: () => any;
  supportOnClick: () => any;
  profileOnClick: () => any;
}

const AppFooterContainer= styled.div`
  background-color: ${defaultTheme.colors.greyOne};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%
`



export const AppFooter = (props: AppFooterProps) => {
  return(
    <AppFooterContainer>
      <FooterIcons {...props}/>
    </AppFooterContainer>
  )
}

const FooterButton = styled(Button)`
  border: none;
  background: none;
  box-shadow: none;

  &:hover { 
    color: ${defaultTheme.colors.greyFour};
    box-shadow: none;
    border-color: ${defaultTheme.colors.greyFour};
    transition: none;
    -webkit-transition: none;
  }

  &:active {
    color: ${defaultTheme.colors.greyFour};
    box-shadow: none;
    transform: scale(.975);
    border-color: ${defaultTheme.colors.greyFour};
    transition: none;
    -webkit-transition: none;
  }
`;


const FooterIconsContainer = styled.div`
  border-radius: 10px;
  padding: 6px 10px 6px 10px;
  margin-top: 6px;
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(71, 133, 254, 0.04);
`
const FooterIconContainer= styled.div`
  width: 14%;
  display: block;
  margin: auto;
  padding-top: 5px;
`;

const SpaceSpan = styled.span`
  margin-right: 7%;
`;

export const FooterIcons = (props: AppFooterProps) => {
  const { selectedIcon, onClicks } = props;
  return(
    <FooterIconsContainer>
      <FooterIconContainer>
        <FooterButton type={"ghost"} onClick={onClicks ? onClicks.ordersOnClick : undefined} icon={<SelectableIcon isSelected={true} type={"order"}/>}/>
      </FooterIconContainer>
      <SpaceSpan />
      <FooterIconContainer>
        <FooterButton type={"ghost"} onClick={onClicks ? onClicks.inventoryOnClick : undefined} icon={<SelectableIcon isSelected={selectedIcon === "inventory"} type={"inventory"}/>}/>
      </FooterIconContainer>
      <SpaceSpan />
      <FooterIconContainer>
        <FooterButton type={"ghost"} onClick={onClicks ? onClicks.supportOnClick : undefined} icon={<SelectableIcon isSelected={selectedIcon === "support"} type={"support"}/>}/>
      </FooterIconContainer>
      <SpaceSpan />
      <FooterIconContainer>
        <FooterButton type={"ghost"} onClick={onClicks ? onClicks.profileOnClick : undefined} icon={<SelectableIcon isSelected={selectedIcon === "profile"} type={"profile"}/>}/>
      </FooterIconContainer>
    </FooterIconsContainer>
  )
}