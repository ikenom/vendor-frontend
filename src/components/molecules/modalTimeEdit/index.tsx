import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../../atoms/button";
import { TimeDisplay, TimeDisplayProps } from "../../atoms/timeDisplay";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"


export interface Props {
  timeRemaining?: number;
  onUpdate: (extendTime: number) => any;
  initialTime: number;
}

export const DEFAULT_TIME_IN_MINUTES = 10;

const Container = styled.div `
  display: flex;
  flex-direction: row;
  max-width: 53%;
  margin: 0% 20% 0% 20%;
  justify-content: space-between;
  align-items: center;
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
  const { timeRemaining, onUpdate, initialTime } = props;

  const [extendTime, setExtendTime] = useState(initialTime);

  const updateExtendTime = (newTime: number) => {
    setExtendTime(newTime)
    onUpdate(newTime)
  }

  const increment = () => {
    updateExtendTime(extendTime + 1)
  }

  const decrement = () => {
    updateExtendTime(extendTime - 1)
  }

  return(
    <Container>
      <ButtonContainer type={"ghost"} icon={<MinusOutlined/>} onClick={decrement} disabled={extendTime < 1}/>
      <Time minutes={extendTime}/>
      <ButtonContainer type={"ghost"} icon={<PlusOutlined/>} onClick={increment} disabled={extendTime > 90}/>
    </Container>
  )
}