import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { TimeRemainingLabel } from "../../../atoms/timeRemainingLabel";
import { HeaderLabel, HeaderLabelProps } from "../../headers/OrderHeader/HeaderLabel";
import { DEFAULT_TIME_IN_MINUTES, TimeEdit } from "../../modalTimeEdit";
import { DefaultModal, ModalProps } from "../modal";

const SEND_TO_KITCHEN = "Send To Kitchen!";
const SEND_TO_KITCHEN_MESSAGE_LABEL = "Pickup Time?";
const SEND_TO_KITCHEN_MESSAGE = "When will this order be ready for pickup?";

const NEED_EXTENSION = "Need an Extension?";
const NEED_EXTENSION_MESSAGE_LABEL = "Extend Time";
const NEED_EXTENSION_MESSAGE = "How much additional time do you need?";

export type modalType = "Send To Kitchen" | "Extension";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderDetails = styled(HeaderLabel)`
`;

const Space = styled.span`
  height: 20px;
`;

const TimeRemainingContainer = styled(TimeRemainingLabel)`
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 84%;
  margin: 9.5% 0% 7% 0%
`;

const MessageLabel = styled.p`
  font-family: ${defaultTheme.fontSize.m};
  font-family: ${defaultTheme.fontFamily.hnt_medium};
`;

const Message = styled.p`
  font-family: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt};
`;

const EditTime = styled(TimeEdit)`
  max-height: 25%;
  height: 20%;
`;

export interface ContentProps {
    orderDetails: HeaderLabelProps;
    showTimeRemaining: boolean;
    timeRemainingInMinutes?: number;
    modalType: modalType;
    onUpdate: (extendTime: number) => any; 
    initialTime: number;
}

export const TimeUpdateContent = (props: ContentProps) => {
    const { orderDetails, modalType, onUpdate, initialTime, timeRemainingInMinutes, showTimeRemaining } = props;
  return(
    <ContentContainer>
      <OrderDetails {...orderDetails} withoutBar={true}/>
      <Space />
      {showTimeRemaining ? <TimeRemainingContainer timeRemainingInMinutes={timeRemainingInMinutes}/> : <> </>}
      <MessageContainer>
        <MessageLabel>{modalType === "Send To Kitchen" ? SEND_TO_KITCHEN_MESSAGE_LABEL : NEED_EXTENSION_MESSAGE_LABEL}</MessageLabel>
        <Message>{modalType === "Send To Kitchen" ? SEND_TO_KITCHEN_MESSAGE : NEED_EXTENSION_MESSAGE}</Message>
      </MessageContainer>
      <EditTime onUpdate={onUpdate} initialTime={initialTime}/>
    </ContentContainer>
  )
}

interface TimeUpdateModalProps extends Omit<ModalProps, "title" | "content" | "buttonLabel"> {
  onSubmit: (data: any) => any;
  isLoading?: boolean;
  type: modalType;
  contentProps: Omit<ContentProps, "onUpdate" | "showTimeRemaining" | "initialTime">;
}

export const TimeUpdateModal = (props: Omit<TimeUpdateModalProps, "title" | "content" | "buttonLabel">) => {
  const { isOpen, onClose, onSubmit, type, contentProps, isLoading } = props;

  const [timeInMinutes, setTimeInMinutes] = React.useState(DEFAULT_TIME_IN_MINUTES);

  const onModalSubmit = () => {
    onSubmit(timeInMinutes)
  }

  const onUpdate = (extendTime: number) => {
    setTimeInMinutes(extendTime)
  }

  let title = "";
  let buttonText = "";
  let showTimeRemaining = false;

  switch(type) {
    case "Send To Kitchen": {
      title = SEND_TO_KITCHEN
      buttonText = "Confirm"
      break
    }
    case "Extension": {
      title = NEED_EXTENSION
      buttonText = "Extend Time"
      showTimeRemaining = true
    }
  }

  return (
    <DefaultModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title} 
      content={TimeUpdateContent({...contentProps, onUpdate, showTimeRemaining, initialTime: DEFAULT_TIME_IN_MINUTES})} 
      onSubmit={onModalSubmit} 
      buttonLabel={buttonText}
      isLoading={isLoading}
    />)

}