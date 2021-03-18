import React from "react";
import styled from "styled-components";
import { HeaderActions, HeaderActionsProps } from "../HeaderActions";
import { HeaderLabel, HeaderLabelProps } from "../HeaderLabel";

export interface HeaderContentProps {
  labelProps: HeaderLabelProps;
  actionProps?: HeaderActionsProps;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const Space = styled.span`
  width: 162%
`;

const Actions = styled(HeaderActions)`
  width: 31%;
  height: 14%;
  margin-left: 30px;
`

export const HeaderContent = (props: HeaderContentProps) => {
  const { labelProps } = props;

  return (
    <Container>
      <HeaderLabel {...labelProps}/>
      <Space />
      <Actions />
    </Container>
  )
}