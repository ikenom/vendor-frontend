import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";

export interface TimeDisplayProps {
  minutes: number;
}

const Content = styled.div`
  background: ${defaultTheme.colors.greyThree};
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 5% 16% 5% 16%;
  margin: 0% 10% 0% 10%;
`;

const NumText = styled.p`
  font-size: ${defaultTheme.fontSize.max};
  font-family: ${defaultTheme.fontFamily.hnt};
  text-align: center;
  font-weight: 600;
  max-height: 50px;
`;

const UnitText = styled.p`
  font-size: ${defaultTheme.fontSize.m};
  font-family: ${defaultTheme.fontFamily.hnt};
  text-align: center;
  font-weight: 400;
`;

export const TimeDisplay = (props: TimeDisplayProps) => {

  const { minutes } = props;
  return (
    <Content>
      <NumText>{ minutes }</NumText>
      <UnitText>min</UnitText>
    </Content>
  )
}