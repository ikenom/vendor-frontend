import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { SelectableIcon, SelectableIcons } from "../../../icons/components";
import Button from "../../atoms/button";

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



const DarkBar= styled.div`
  border-top: 5px solid ${defaultTheme.colors.black};
  height: 7%;
  width: 40%;
  margin-left: 30%;
  margin-bottom: 7px;
  border-radius: 10px;
`;


export const AppFooter = (props: AppFooterProps) => {
  return(
    <AppFooterContainer>
      <FooterIcons {...props}/>
      <DarkBar />
    </AppFooterContainer>
  )
}


const FooterIconsContainer = styled.div`
  margin-bottom: 10px;
  margin-top: 6px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: rgba(71, 133, 254, 0.04);
`
const FooterIconContainer= styled.div`
  width: 15%;
  margin-top: 9px;
`;

export const FooterIcons = (props: AppFooterProps) => {
  const { selectedIcon, onClicks } = props;
  return(
    <FooterIconsContainer>
      <FooterIconContainer>
        <Button type={"ghost"} onClick={onClicks ? onClicks.ordersOnClick : undefined} icon={<SelectableIcon isSelected={true} type={"order"}/>}/>
      </FooterIconContainer>
      <FooterIconContainer>
        <Button type={"ghost"} onClick={onClicks ? onClicks.inventoryOnClick : undefined} icon={<SelectableIcon isSelected={selectedIcon === "inventory"} type={"inventory"}/>}/>
      </FooterIconContainer>
      <FooterIconContainer>
        <Button type={"ghost"} onClick={onClicks ? onClicks.supportOnClick : undefined} icon={<SelectableIcon isSelected={selectedIcon === "support"} type={"support"}/>}/>
      </FooterIconContainer>
      <FooterIconContainer>
        <Button type={"ghost"} onClick={onClicks ? onClicks.profileOnClick : undefined} icon={<SelectableIcon isSelected={selectedIcon === "profile"} type={"profile"}/>}/>
      </FooterIconContainer>
    </FooterIconsContainer>
  )
}