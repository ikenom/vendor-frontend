import React, { useState } from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { PauseIcon, CancelIcon} from "../../../../icons/components";
import { DefaultModal, ModalProps } from "../modal";

const TITLE = "More Options";

export type ActionType = "pause" | "cancel";

interface OrderAction {
  label: string;
  actionText: string;
  iconType: ActionType;
  isSelected: boolean;
  onClick?: () => any;
}

const ActionContainer = styled.div<{isSelected: boolean}>`
  height: 23%;
  max-height: 23%;
  display: flex;
  flex-direction: row;
  margin: 0px 0px 30px 0px;
  cursor: pointer;
  ${({ isSelected }) => isSelected ? 
    `border: 1px solid ${defaultTheme.colors.blue};
     padding: 5px;
     box-shadow 0px 15px 25px -5px rgba(darken(dodgerblue, 40%));
     transform scale(1.03);` 
    : 
    ''}
`;

const ActionTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 84%;
`;

const ActionHeader = styled.p`
  font-size: ${defaultTheme.fontSize.m};
  font-family: ${defaultTheme.fontFamily.hnt_bold};
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
  margin: 16px 16px 0px 0px;
`;

const CancelContainer = styled(CancelIcon)`
  height: 30px;
  width: 30px;
  margin: 16px 16px 0px 0px;
`;


const OrderAction = (props: OrderAction) => {
  const { label, actionText, iconType, isSelected, onClick } = props;

  return (
    <ActionContainer isSelected={isSelected} onClick={onClick}>
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

interface NeedsActionContentProps {
  onUpdate: (selectedAction: ActionType) => void;
  selectedAction: ActionType;
}

export const NeedsActionContent = (props: NeedsActionContentProps) => {

  const { onUpdate, selectedAction } = props;

  const onClick = (selectedAction: ActionType) => {
    onUpdate(selectedAction);
  }
  return(
    <ActionsContainer>
      <OrderAction 
        label={"Pause Order"} 
        actionText={"The customer will be notified their order is paused."}
        iconType={"pause"}
        onClick={() => onClick("pause")}
        isSelected={selectedAction === "pause"}
      />
      <OrderAction 
        label={"Cancel Order"} 
        actionText={"The customer will be notified their order is canceled, and will be refunded."}
        iconType={"cancel"}
        onClick={() => onClick("cancel")}
        isSelected={selectedAction === "cancel"}
      />
    </ActionsContainer>
  )
}


export const NeedsActionModal = (props: Omit<ModalProps, "title" | "content" | "buttonLabel">) => {
  const { isOpen, onClose, onSubmit } = props;

  const [selectedAction, setSelectedAction] = useState<ActionType>();

  const onUpdate = (selectedAction: ActionType) => {
    setSelectedAction(selectedAction)
  }

  const onModalSubmit = () => {
    onSubmit(selectedAction);
  }

  return (<DefaultModal isOpen={isOpen} onClose={onClose} title={TITLE} content={NeedsActionContent({onUpdate, selectedAction})} onSubmit={onModalSubmit} buttonLabel="Confirm"/>)

}