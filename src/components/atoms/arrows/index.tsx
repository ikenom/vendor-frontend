import { CaretUpFilled } from '@ant-design/icons';
import { color, variant } from "styled-system";
import styled, { css } from "styled-components";

export type CaretType = "up" | "down"

export const caretCss = css`
  display: flex;
  justify-content: center;
`;

export interface CaretProps {
  type?: CaretType
  color?: string;
  inverted?: boolean
}

export const caretTypeVariant = variant({
  prop: "type",
  variants: {
    down: {
      rotate: 180
    }
  }
});

export const Caret = styled(CaretUpFilled)<CaretProps>`
  ${color}
  ${caretCss}
  ${caretTypeVariant}
`;