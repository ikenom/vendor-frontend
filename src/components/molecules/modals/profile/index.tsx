import { CheckCircleFilled, MinusCircleFilled, MinusSquareFilled } from "@ant-design/icons";
import { Badge, Spin, Switch } from "antd";
import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { Divider } from "../../../layouts/divider";
import { DefaultModal, ModalProps } from "../modal";

export interface SettingsModalContentProps {
  isEnabled: boolean;
  onEnablePrinter: () => any;
  onDisablePrinter: () => any;
  isConnectedToPrinter: boolean;
  isAttemptingToConnect: boolean;
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 4px;
  margin-top: 1px;
  border-top-color: black
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SectionHeader = styled.p`
  font-size: ${defaultTheme.fontSize.lg};
  font-family: ${defaultTheme.fontFamily.hnt_bold};
  margin-bottom: 8px;
`;

const TextLabel = styled.p`
  font-size: ${defaultTheme.fontSize.m};
  font-family: ${defaultTheme.fontFamily.hnt_medium};
  margin-bottom: 16px;
`;

const SuccessIcon = styled(CheckCircleFilled)`
  color: #3EA845;
  font-size: 22px;
`;

const FailedIcon = styled(MinusSquareFilled)`
  color: #E77B18;
  font-size: 22px;
`;

export const SettingModalContent = (props: SettingsModalContentProps) => {
  const { onEnablePrinter, onDisablePrinter, isConnectedToPrinter, isEnabled, isAttemptingToConnect } = props;

  const onChange = (checked: boolean) => {
    if(checked) {
      onEnablePrinter()
      return
    }

    onDisablePrinter()
  }

  const isConnectedText = isConnectedToPrinter ? "Connected" : "Disconnected";

  return(
    <ContentContainer>
      <StyledDivider />
      <SectionHeader>Printer</SectionHeader>
      { isEnabled && (
        <Section style={{width: "190px"}}>
          <TextLabel>{`Status: ${isAttemptingToConnect ? "Attempting to Connect" : isConnectedText} `}</TextLabel>
          { isAttemptingToConnect ? 
              <Spin/> : 
              isConnectedToPrinter ? 
                <SuccessIcon />: 
                <FailedIcon />
          }
        </Section>
      )}
        <Section style={{width: "125px"}}>
          <TextLabel>{`${isEnabled ? "Disable" : "Enable"}:`}</TextLabel>
          <Switch onChange={onChange} checked={isEnabled}/>
        </Section>
    </ContentContainer>
  )
}

interface SettingsModalProps extends Omit<ModalProps, "title" | "content" | "onSubmit">, SettingsModalContentProps {
}

export const SettingsModal = (props: SettingsModalProps) => {
  const { isOpen, onClose} = props;

  return (<DefaultModal margin="3% 0% 1% 0%" isOpen={isOpen} onClose={onClose} title={"Settings"} content={<SettingModalContent {...props}/>} onSubmit={() => {}}/>)
}
