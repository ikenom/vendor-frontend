import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../atoms/button";
import { TimeDisplay } from "../../atoms/timeDisplay";
import { MinusIcon, PlusIcon } from "../../../icons/components";


export interface Props {
  timeRemaining?: number;
  onUpdate: (extendTime: number) => any;
  initialTime: number;
}

export const DEFAULT_TIME_IN_MINUTES = 30;
export const DEFAULT_TIME_INTERVAL_IN_MINUTES = 5;

const Container = styled.div `
  display: flex;
  flex-direction: row;
  max-width: 70%;
  justify-content: space-between;
  align-items: center;
  margin: 0% 0% 0% 14%;
`;

const ButtonContainer = styled(Button)`
  width: 25px;
  height: 25px;
`;

const Time = styled(TimeDisplay)`
  max-height: 100%;
  height: 100%;
  margin: 0% 6% 0% 6%;
`;


export const TimeEdit = (props: Props) => {
  const { onUpdate, initialTime } = props;

  const [extendTime, setExtendTime] = useState(initialTime);

  const updateExtendTime = (newTime: number) => {
    setExtendTime(newTime)
    onUpdate(newTime)
  }

  const increment = () => {
    updateExtendTime(extendTime + DEFAULT_TIME_INTERVAL_IN_MINUTES)
  }

  const decrement = () => {
    updateExtendTime(extendTime - DEFAULT_TIME_INTERVAL_IN_MINUTES)
  }

  return(
    <Container>
      <ButtonContainer type={"ghost"} icon={<MinusIcon/>} onClick={decrement} disabled={extendTime < 1}/>
      <Time minutes={extendTime}/>
      <ButtonContainer type={"ghost"} icon={<PlusIcon/>} onClick={increment} disabled={extendTime > 120}/>
    </Container>
  )
}