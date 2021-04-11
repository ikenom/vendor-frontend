import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import { LoaderIcon } from "../../../icons/components";

interface TimeRemainingLabelProps {
  timeRemainingInMinutes: number;
}

const Container = styled.div`
  background-color: ${defaultTheme.colors.yellow};
  max-width: 195px;
  max-height: 29px;
  display: flex;
  flex-direction: row;
  border-radius: 3px;
`;

const Text = styled.p`
  font-family: ${defaultTheme.fontFamily.hnt};
  font-size: ${defaultTheme.fontSize.default};
  color: ${defaultTheme.colors.blue};
  margin: 0px 0px 0px 3px;
`;

const LoaderIconContainer = styled(LoaderIcon)`
  max-width: 12px;
  max-height: 12px;
  margin: 5px 0px 0px 3px;
`;

export const TimeRemainingLabel = (props: TimeRemainingLabelProps) => {
  const { timeRemainingInMinutes } = props;
  return(
    <Container>
      <Text> {`Time Remaining: ${timeRemainingInMinutes} mins`} </Text>
      <LoaderIconContainer />
    </Container>
  )
}