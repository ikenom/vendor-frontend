import React, { useState } from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../../defaultTheme";
import { LoaderIcon, MessageIcon, MoreOptionsIcon, PhoneIcon } from "../../../../../icons/components";
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
  timeRemainingInMinutes?: number;
  modalContentProps?: Omit<ContentProps, "onUpdate" | "showTimeRemaining" | "initialTime">;
}

const ActionsContainer = styled.div<{shouldAddMargin: boolean}>`
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;

  ${({ shouldAddMargin }) => shouldAddMargin ? `margin-left: 65%;`: ``}
`;

const TimeRemainingContainer = styled.div`
  background-color: ${defaultTheme.colors.yellow};
  display: flex;
  flex-direction: row;
  border-radius: 3px;
  margin: 10px 0px 0px 0px;
  min-width: 190px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PhoneButton = styled(Button)`
  max-width: 30px;
  max-height: 30px;
  margin-right: 10%;
  box-shadow: 0px;
`;

const MessageButton = styled(Button)`
  max-width: 28px;
  max-height: 28px;
  margin-right: 10%;
`;

const ModalButton = styled(Button)`
  max-width: 28px;
  max-height: 28px;
  box-shadow: 0px !important;
`;

const Text = styled.p`
  font-family: ${defaultTheme.fontFamily.hnt};
  font-size: 13px;
  color: ${defaultTheme.colors.blue};
  padding-left: 6px;
  padding-top: 1px;
  padding-bottom: 1px;
  margin-right: 0%;
  min-width: 170px;
`;

const LoaderIconContainer = styled(LoaderIcon)`
  max-width: 12px;
  max-height: 12px;
  margin: 3% 0% 0% 1%;
`;

export const HeaderActions = (props: HeaderActionsProps) => {
  const { modalType, modalSubmit, modalContentProps, timeRemainingInMinutes } = props;

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
      <ActionsContainer shouldAddMargin={timeRemainingInMinutes !== undefined && modalType === "In Kitchen"}>
        <PhoneButton type={"ghost"} shape={"circle"} icon={<PhoneIcon/>}/>
        <ModalButton type={"ghost"} shape={"circle"} icon={<MoreOptionsIcon/>} onClick={showModal}/>
        <ActionModal/>
      </ActionsContainer>
      { timeRemainingInMinutes && modalType === "In Kitchen"
          ? 
            <TimeRemainingContainer>
              <Text> {`Time Remaining: ${timeRemainingInMinutes} mins`} </Text> 
              <LoaderIconContainer />
            </TimeRemainingContainer>
          : 
            <> </>}
    </Container>
  )
}