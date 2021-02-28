import React from "react";
import { Meta } from "@storybook/react";
import SelectedOrderLogo from '../../src/icons/svg/orderIcons/selectedOrderIcon.svg'
import UnSelectedOrderLogo from '../../src/icons/svg/orderIcons/unselectedOrderIcon.svg'
import SelectedProfileLogo from '../../src/icons/svg/profileIcons/selectedProfileIcon.svg'
import UnSelectedProfileLogo from '../../src/icons/svg/profileIcons/unselectedProfileIcon.svg'
import SelectedInventoryLogo from '../../src/icons/svg/inventoryIcons/selectedInventoryIcon.svg'
import UnSelectedInventoryLogo from '../../src/icons/svg/inventoryIcons/unselectedInventoryIcon.svg'
import SelectedSupportLogo from '../../src/icons/svg/supportIcons/selectedSupportIcon.svg'
import UnSelectedSupportLogo from '../../src/icons/svg/supportIcons/unselectedSupportIcon.svg'
import PhoneLogo from '../../src/icons/svg/phoneIcon.svg'
import MessageLogo from '../../src/icons/svg/messageIcon.svg'
import ArrowLogo from '../../src/icons/svg/arrow.svg'
import SearchLogo from '../../src/icons/svg/searchIcon.svg'
import styled from "styled-components";

export default {
  title: "Icons/All",
} as Meta;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  margin: 9px;
`;

const GroupIconContainer = styled.div`
  display: flex;
  padding-bottom: 5px;
`;

const OrdersIcon = () => (
  <GroupIconContainer>
    <IconContainer>
      <SelectedOrderLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
    <IconContainer>
      <UnSelectedOrderLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
  </GroupIconContainer>
)

const ProfileIcon = () => (
  <GroupIconContainer>
    <IconContainer>
      <SelectedProfileLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
    <IconContainer>
      <UnSelectedProfileLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
  </GroupIconContainer>
)

const InventoryIcon = () => (
  <GroupIconContainer>
    <IconContainer>
      <SelectedInventoryLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
    <IconContainer>
      <UnSelectedInventoryLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
  </GroupIconContainer>
)

const SupportIcon = () => (
  <GroupIconContainer>
    <IconContainer>
      <SelectedSupportLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
    <IconContainer>
      <UnSelectedSupportLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
  </GroupIconContainer>
)

const PhoneIcon = () => (
  <>
    <IconContainer>
      <PhoneLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
  </>
)

const MessageIcon = () => (
  <>
    <IconContainer>
      <MessageLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
  </>
)

const ArrowIcon = () => (
  <>
    <IconContainer>
      <ArrowLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
  </>
)

const SearchIcon = () => (
  <>
    <IconContainer>
      <SearchLogo style={{width: "100%", height: "100%"}}/>
    </IconContainer>
  </>
)

const IconGroup = () => (
  <GroupIconContainer>
    <PhoneIcon/>
    <MessageIcon/>
    <ArrowIcon/>
    <SearchIcon/>
  </GroupIconContainer>
)

export const Icons = () => {
  return (
    <>
    <OrdersIcon/>
    <ProfileIcon/>
    <InventoryIcon/>
    <SupportIcon/>
    <IconGroup/>
    </>
  )
}