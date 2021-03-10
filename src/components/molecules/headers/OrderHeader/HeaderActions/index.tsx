import React from "react";
import styled from "styled-components";
import { MessageIcon, MoreOptionsIcon, PhoneIcon } from "../../../../../icons/components";
import { Button } from "../../../../atoms/button";
import "./index.css"

export interface HeaderActionsProps {
  phoneOnClick?: () => any;
  messageOnClick?: () => any;
  modalOnClick?: () => any;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
`;

const PhoneButton = styled(Button)`
  max-width: 24%;
  max-height: 50%;
  margin-right: 13%;
`;

const MessageButton = styled(Button)`
  max-width: 24%;
  max-height: 50%;
  margin-right: 13%;
`;

const ModalButton = styled(Button)`
  max-width: 24%;
  max-height: 50%;
`;

export const HeaderActions = (props: HeaderActionsProps) => {

  return(
    <Container>
      <PhoneButton type={"ghost"} shape={"circle"} icon={<PhoneIcon/>}/>
      <MessageButton type={"ghost"} shape={"circle"} icon={<MessageIcon/>}/>
      <ModalButton type={"ghost"} shape={"circle"} icon={<MoreOptionsIcon/>}/>
    </Container>
  )
}