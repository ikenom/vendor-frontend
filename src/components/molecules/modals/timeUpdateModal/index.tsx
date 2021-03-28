import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { HeaderLabel, HeaderLabelProps } from "../../headers/OrderHeader/HeaderLabel";
import { TimeEdit } from "../../modalTimeEdit";
import { DefaultModal, ModalProps } from "../modal";

const SEND_TO_KITCHEN = "Send To Kitchen!";
const SEND_TO_KITCHEN_MESSAGE_LABEL = "Pickup Time?";
const SEND_TO_KITCHEN_MESSAGE = "When will this order be ready for pickup?";

const NEED_EXTENSION = "Need an Extension?";
const NEED_EXTENSION_MESSAGE_LABEL = "Extend Time";
const NEED_EXTENSION_MESSAGE = "How much additional time do you need?";

type modalType = "Send To Kitchen" | "Extension";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderDetails = styled(HeaderLabel)`
  max-width: 32%;
  width: 32%;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 84%;
  font-family: ${defaultTheme.fontFamily.hnt};
  margin: 5% 0% 7% 0%
`;

const MessageLabel = styled.p`
  font-family: ${defaultTheme.fontSize.m};
  font-weight: 600;
`;

const Message = styled.p`
  font-family: ${defaultTheme.fontSize.sm};
  font-weight: 400;
`;

const EditTime = styled(TimeEdit)`
  max-height: 25%;
  height: 20%;
`;

export interface ContentProps {
    orderDetails: HeaderLabelProps;
    showTimeRemaining: boolean;
    modalType: modalType;
    onUpdate: (extendTime: number) => any; 
}

export const TimeUpdateContent = (props: ContentProps) => {
    const { orderDetails, modalType, onUpdate } = props;
  return(
    <ContentContainer>
      <OrderDetails {...orderDetails}/>
      <MessageContainer>
        <MessageLabel>{modalType === "Send To Kitchen" ? SEND_TO_KITCHEN_MESSAGE_LABEL : NEED_EXTENSION_MESSAGE_LABEL}</MessageLabel>
        <Message>{modalType === "Send To Kitchen" ? SEND_TO_KITCHEN_MESSAGE : NEED_EXTENSION_MESSAGE}</Message>
      </MessageContainer>
      <EditTime onUpdate={onUpdate} />
    </ContentContainer>
  )
}

interface TimeUpdateModalProps extends Omit<ModalProps, "title" | "content" | "buttonLabel"> {
  onSubmit: () => any;
  type: modalType;
  contentProps: ContentProps;
}

export const TimeUpdateModal = (props: Omit<TimeUpdateModalProps, "title" | "content" | "buttonLabel">) => {
  const { isOpen, onClose, onSubmit, type, contentProps } = props;

  let title = "";
  let buttonText = "";

  switch(type) {
    case "Send To Kitchen": {
      title = SEND_TO_KITCHEN
      buttonText = "Confirm"
      break
    }
    case "Extension": {
      title = NEED_EXTENSION
      buttonText = "ExtendTime"
    }
  }

  return (<DefaultModal isOpen={isOpen} onClose={onClose} title={title} content={TimeUpdateContent(contentProps)} onSubmit={onSubmit} buttonLabel={buttonText}/>)

}