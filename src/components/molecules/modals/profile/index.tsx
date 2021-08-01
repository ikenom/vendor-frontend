import { Badge, Switch } from "antd";
import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";
import { DefaultModal, ModalProps } from "../modal";

export interface SettingsModalContentProps {
  isEnabled: boolean;
  onEnablePrinter: () => any;
  onDisablePrinter: () => any;
  isConnectedToPrinter: boolean;
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const TextLabel = styled.p`
  font-family: ${defaultTheme.fontSize.m};
  font-family: ${defaultTheme.fontFamily.hnt_medium};
  margin-bottom: 16px;
`;

export const SettingModalContent = (props: SettingsModalContentProps) => {
  const { onEnablePrinter, onDisablePrinter, isConnectedToPrinter, isEnabled } = props;

  const onChange = (checked: boolean) => {
    if(checked) {
      onEnablePrinter()
      return
    }

    onDisablePrinter()
  }

  return(
    <ContentContainer>
      { isEnabled && (
        <Section>
          <TextLabel>Printer Status: </TextLabel>
          {isConnectedToPrinter ? <Badge status="success" /> : <Badge status="error" />}
        </Section>
      )}
      <TextLabel>
        <Section>
          <TextLabel>{isEnabled ? "Disable" : "Enable"}</TextLabel>
          <Switch onChange={onChange}/>
        </Section>
      </TextLabel>
    </ContentContainer>
  )
}

interface SettingsModalProps extends Omit<ModalProps, "title" | "content" | "onSubmit">, SettingsModalContentProps {
}

export const SettingsModal = (props: SettingsModalProps) => {
  const { isOpen, onClose} = props;

  return (<DefaultModal isOpen={isOpen} onClose={onClose} title={"Settings"} content={<SettingModalContent {...props}/>} onSubmit={() => {}}/>)
}
