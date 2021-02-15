import styled, { css } from "styled-components";
import { layout } from "styled-system";

export const scoreBarCss = css`
display: inline-block;
  border-radius: 2px;
  background: linear-gradient(270deg, #C7534E 4.93%, #E3C065 27.8%, #19953D 52.88%, #F3E952 76.91%, #BF3E3E 101.55%, #000000 101.55%)
`;


export const ScoreGradient = styled.span`
${scoreBarCss}
${layout}
`;

export default ScoreGradient;
