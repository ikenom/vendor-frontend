import styled, { css } from 'styled-components';
import ProfileLogo from '../svg/profileIcons/baseProfileIcon.svg';
import ArrowLogo from '../svg/arrow.svg';
import SelectedOrderLogo from '../svg/orderIcons/selectedOrderIcon.svg';
import UnSelectedOrderLogo from '../svg/orderIcons/unselectedOrderIcon.svg';

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

export const SelectedOrderIcon = styled(SelectedOrderLogo)`
  ${iconCss}
`;

export const UnSelectedOrderIcon = styled(UnSelectedOrderLogo)`
  ${iconCss}
`;
