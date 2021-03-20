import React, { useState } from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { PauseIcon, CancelIcon} from "../../../../icons/components";
import { DefaultModal, ModalProps } from "../modal";

const TITLE = "More Options";

type actionType = "pause" | "cancel";

interface OrderAction {
  label: string;
  actionText: string;
  iconType: actionType;
  isSelected: boolean;
  onClick?: () => any;
}

const ActionContainer = styled.div<{isSelected: boolean}>`
  height: 23%;
  max-height: 23%;
  display: flex;
  flex-direction: row;
  margin: 0px 0px 30px 0px;
  ${({ isSelected }) => isSelected ? `border: 1px solid ${defaultTheme.colors.blue};` : ''}
`;

const ActionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionHeader = styled.p`
  font-size: ${defaultTheme.fontSize.m};
  font-family: ${defaultTheme.fontFamily.hnt};
  font-weight: 700px;
  margin: 0px 6px 0px 0px;
`

const ActionContent = styled.p`
  font-size: ${defaultTheme.fontSize.default};
  font-family: ${defaultTheme.fontFamily.hnt};
  weight: 400px;
`;

const PauseContainer = styled(PauseIcon)`
  height: 30px;
  width: 30px;
  margin: 0px 16px 0px 0px;
`;

const CancelContainer = styled(CancelIcon)`
  height: 30px;
  width: 30px;
  margin: 0px 16px 0px 0px;
`;


const OrderAction = (props: OrderAction) => {
  const { label, actionText, iconType, isSelected } = props;

  return (
    <ActionContainer isSelected={isSelected}>
      { iconType === "pause" ? <PauseContainer /> : <CancelContainer/> }
      <ActionTextContainer>
        <ActionHeader>{label}</ActionHeader>
        <ActionContent>{actionText}</ActionContent>
      </ActionTextContainer>
    </ActionContainer>
  )
}


const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NeedsActionContent = () => {

  const [selectedAction, setSelectedAction] = useState<actionType>();

  return(
    <ActionsContainer>
      <OrderAction 
        label={"Pause Order"} 
        actionText={"The customer will be notified their order is paused."}
        iconType={"pause"}
        onClick={() => setSelectedAction("pause")}
        isSelected={selectedAction === "pause"}
      />
      <OrderAction 
        label={"Cancel Order"} 
        actionText={"The customer will be notified their order is canceled, and will be refunded."}
        iconType={"cancel"}
        onClick={() => setSelectedAction("cancel")}
        isSelected={selectedAction === "cancel"}
      />
    </ActionsContainer>
  )
}

export const NeedsActionModal = (props: Omit<ModalProps, "title" | "content" | "buttonLabel">) => {
  const { isOpen, onClose, onSubmit } = props;

  return (<DefaultModal isOpen={isOpen} onClose={onClose} title={TITLE} content={NeedsActionContent()} onSubmit={onSubmit} buttonLabel="Confirm"/>)

}