import React, { useState } from "react";
import styled from "styled-components";
import { MessageIcon, MoreOptionsIcon, PhoneIcon } from "../../../../../icons/components";
import { OrderStatus } from "../../../../../models/orders";
import { Button } from "../../../../atoms/button";
import { ActionType, NeedsActionModal } from "../../../modals/needsAction";
import { ContentProps, TimeUpdateModal } from "../../../modals/timeUpdateModal";
import "./index.css"

export interface HeaderActionsProps {
  phoneOnClick?: () => any;
  messageOnClick?: () => any;
  modalType: OrderStatus;
  modalSubmit: (data?: any) => void;
  modalContentProps?: Omit<ContentProps, "onUpdate" | "showTimeRemaining" | "initialTime">;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
`;

const PhoneButton = styled(Button)`
  max-width: 40px;
  max-height: 40px;
  margin-right: 10%;
`;

const MessageButton = styled(Button)`
  max-width: 40px;
  max-height: 40px;
  margin-right: 10%;
`;

const ModalButton = styled(Button)`
  max-width: 40px;
  max-height: 40px;
`;

export const HeaderActions = (props: HeaderActionsProps) => {
  const { modalType, modalSubmit, modalContentProps } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
  }

  const ActionModal = () => {
    switch(modalType) {
      case "Needs Action": {
        return (<NeedsActionModal isOpen={isModalVisible} onClose={onClose} onSubmit={modalSubmit}/>)
      }
      case "In Kitchen": {
        return (<TimeUpdateModal isOpen={isModalVisible} onClose={onClose} onSubmit={modalSubmit} type={"Extension"} contentProps={modalContentProps}/>)
      }
      default :{
        return (<> </>)
      }
    }
  }

  return(
    <Container>
      <PhoneButton type={"ghost"} shape={"circle"} icon={<PhoneIcon/>}/>
      <MessageButton type={"ghost"} shape={"circle"} icon={<MessageIcon/>}/>
      <ModalButton type={"ghost"} shape={"circle"} icon={<MoreOptionsIcon/>} onClick={showModal}/>
      <ActionModal/>
    </Container>
  )
}