import React from "react";
import { Meta } from "@storybook/react";
import { ReactComponent as SelectedOrderLogo} from '../../src/icons/orderIcons/selectedOrderIcon.svg'
import { ReactComponent as UnSelectedOrderLogo} from '../../src/icons/orderIcons/unselectedOrderIcon.svg'
import { ReactComponent as SelectedProfileLogo} from '../../src/icons/profileIcons/selectedProfileIcon.svg'
import { ReactComponent as UnSelectedProfileLogo} from '../../src/icons/profileIcons/unselectedProfileIcon.svg'
import { ReactComponent as SelectedInventoryLogo} from '../../src/icons/inventoryIcons/selectedInventoryIcon.svg'
import { ReactComponent as UnSelectedInventoryLogo} from '../../src/icons/inventoryIcons/unselectedInventoryIcon.svg'
import { ReactComponent as SelectedSupportLogo} from '../../src/icons/supportIcons/selectedSupportIcon.svg'
import { ReactComponent as UnSelectedSupportLogo} from '../../src/icons/supportIcons/unselectedSupportIcon.svg'
import { ReactComponent as PhoneLogo} from '../../src/icons/phoneIcon.svg'
import { ReactComponent as MessageLogo} from '../../src/icons/messageIcon.svg'
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

export const Icons = () => {
  return (
    <>
    <OrdersIcon/>
    <ProfileIcon/>
    <InventoryIcon/>
    <SupportIcon/>
    <PhoneIcon/>
    <MessageIcon/>
    </>
  )
}