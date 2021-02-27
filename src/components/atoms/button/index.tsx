import { Button as AntButton } from "antd";
import styled, { css } from "styled-components";


// button animation for onPress
export const buttonCss = css`
  transition: all 100ms ease-in-out;
  border: none;
  background: none;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.5;
  }
`;


export const Button = styled(AntButton)`
  ${buttonCss}
  width: 100%
`;

export default Button;



