import { Button as AntButton } from "antd";
import styled, { css } from "styled-components";


// button animation for onPress
export const buttonCss = css`
  transition: all .3s;
  border: none;
  background: none;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 15px 25px -5px rgba(darken(dodgerblue, 40%));
    transform: scale(1.03);
  }

  &:active {
    box-shadow: 0px 4px 8px rgba(darken(dodgerblue, 30%));
    transform: scale(.975);
  }

  &:disabled {
    opacity: 0.5;
  }
`;


export const Button = styled(AntButton)`
  ${buttonCss}
  padding: 0;
  width: 100%;
`;

export default Button;



