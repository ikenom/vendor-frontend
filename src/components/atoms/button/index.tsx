import React from "react";
import { Button as AntButton } from "antd";
import styled, { css } from "styled-components";
import { color, variant } from "styled-system";
import { defaultTheme } from "../../../defaultTheme";

export type ButtonType = "primary" | "default";

export const buttonCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: all 100ms ease-in-out;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
  }

`;

export interface ButtonProps {
  block?: boolean; // If true then button will fit in parents entire width
  type: ButtonType;
  danger?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  loading?: boolean | {delay: number};
}

export const buttonTypeVariant = variant({
  prop: "type",
  variants: {
    primary: {
      borderColor: defaultTheme.colors.blue,
      background: defaultTheme.colors.blue,
      color: defaultTheme.colors.white,
      fontFamily: defaultTheme.fontFamily.dual
    },

    default: {
      borderColor: defaultTheme.colors.yellow,
      background: defaultTheme.colors.yellow,
      color: defaultTheme.colors.white,
      fontFamily: defaultTheme.fontFamily.dual
    },
  },
});

export const Button = styled(AntButton)<ButtonProps>`
  ${color}
  ${buttonCss}
  ${buttonTypeVariant}
  width: 100%
`;

export default Button;

Button.defaultProps = {
  color: defaultTheme.colors.white,
}

//TODO
/**
 * 1) Add themes for breakpoints
 * 2) Add container wrapper
 */

