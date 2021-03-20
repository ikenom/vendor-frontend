import styled, { css } from 'styled-components';
import ProfileLogo from '../svg/profileIcons/baseProfileIcon.svg';
import selectedProfileIcon from '../svg/profileIcons/selectedProfileIcon.svg';
import unselectedProfileIcon from '../svg/profileIcons/unselectedProfileIcon.svg';
import ArrowLogo from '../svg/arrow.svg';
import SelectedOrderLogo from '../svg/orderIcons/selectedOrderIcon.svg';
import UnSelectedOrderLogo from '../svg/orderIcons/unselectedOrderIcon.svg';
import SelectedInventoryLogo from '../svg/inventoryIcons/selectedInventoryIcon.svg';
import UnSelectedInventoryLogo from '../svg/inventoryIcons/unselectedInventoryIcon.svg';
import SelectedSupportLogo from '../svg/supportIcons/selectedSupportIcon.svg';
import UnSelectedSupportLogo from '../svg/supportIcons/unselectedSupportIcon.svg';
import SearchLogo from '../svg/searchIcon.svg';
import AttentionNeededLogo from '../svg/attentionNeededIcon.svg';
import PhoneLogo from '../svg/phoneIcon.svg';
import MessageLogo from '../svg/messageIcon.svg';
import BackArrowLogo from '../svg/backArrowIcon.svg';
import MoreOptionsLogo from '../svg/moreOptionsIcon.svg';
import CancelOrderLogo from '../svg/cancelOrderIcon.svg';
import PauseLogo from '../svg/pauseIcon.svg';
import CancelLogo from '../svg/cancelIcon.svg';
import React from 'react';

const iconCss = css`
  width: 100%;
  height: 100%;
`;

export const ProfileIcon = styled(ProfileLogo)`
  ${iconCss}
`

export const ArrowIcon = styled(ArrowLogo)`
  ${iconCss}
`;

export const SearchIcon = styled(SearchLogo)`
  ${iconCss}
`;

export const PauseIcon = styled(PauseLogo)`
  ${iconCss}
`;

export const CancelIcon = styled(CancelLogo)`
  ${iconCss}
`;


/**
 * Selectable Icon types. These are the icons with two svgs (one for selected and one for unselected).
 */
export type SelectableIcons = "order" | "inventory" | "support" | "profile";

interface SelectableIcon {
  isSelected: boolean;
  type: SelectableIcons
}

export const SelectableIcon = (props: SelectableIcon) => {
  const { isSelected, type } = props;
  switch (type) {
    case "order": {
      return(isSelected ? (<SelectedOrderIcon/>) : (<UnSelectedOrderIcon/>))
    }
    case "inventory": {
      return(isSelected ? (<SelectedInventoryIcon/>) : (<UnSelectedInventoryIcon/>))
    }
    case "support": {
      return(isSelected ? (<SelectedSupportIcon/>) : (<UnSelectedSupportIcon/>))
    }
    case "profile": {
      return(isSelected ? (<SelectedProfileIcon/>) : (<UnSelectedProfileIcon/>))
    }
    default: {
      return <p>Whoops</p>;
    }
  }
}

export const SelectedOrderIcon = styled(SelectedOrderLogo)`
  ${iconCss}
`;

export const UnSelectedOrderIcon = styled(UnSelectedOrderLogo)`
  ${iconCss}
`;

export const SelectedInventoryIcon = styled(SelectedInventoryLogo)`
  ${iconCss}
`;

export const UnSelectedInventoryIcon = styled(UnSelectedInventoryLogo)`
  ${iconCss}
`;

export const SelectedSupportIcon = styled(SelectedSupportLogo)`
  ${iconCss}
`;

export const UnSelectedSupportIcon = styled(UnSelectedSupportLogo)`
  ${iconCss}
`;

export const SelectedProfileIcon = styled(selectedProfileIcon)`
  ${iconCss}
`;

export const AttentionNeededIcon = styled(AttentionNeededLogo)`
  ${iconCss}
`;

export const UnSelectedProfileIcon = styled(unselectedProfileIcon)`
  ${iconCss}
`;

export const PhoneIcon = styled(PhoneLogo)`
  ${iconCss}
`;

export const MessageIcon = styled(MessageLogo)`
  ${iconCss}
`;

export const BackArrowIcon = styled(BackArrowLogo)`
  ${iconCss}
`;

export const MoreOptionsIcon = styled(MoreOptionsLogo)`
  ${iconCss}
`;

export const CancelOrderIcon = styled(CancelOrderLogo)`
  ${iconCss}
`;