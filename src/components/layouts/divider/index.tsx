import styled, { css } from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { Divider as AntDivider } from "antd";


const dividerCss = css`
  border-top: 1px solid ${defaultTheme.colors.blue};
  width: 100%
`

export const Divider = styled(AntDivider)`
  ${dividerCss}
`