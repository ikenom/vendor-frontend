import { SettingOutlined } from "@ant-design/icons";
import { Alert, Button } from "antd";
import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../../../defaultTheme";
import PrinterStore from "../../../store/printerStore";
import { DefaultOrganismLayout } from "../../layouts/orders";
import { SettingsModal, SettingsModalContentProps } from "../../molecules/modals/profile";
import { DefaultOrganismProps } from "../orders";



const TextContainer = styled.p`
  width: 41%;
  max-height: 100%;
  font-family: ${defaultTheme.fontFamily.hnt_extra_bold};
  font-style: normal;
  font-size: ${defaultTheme.fontSize.xlg};
  margin-right: 51%;
  margin-bottom: 0px;
  white-space: nowrap;
`;

const ProfileHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
`;

const SettingsButton = styled(Button)`
  background: ${defaultTheme.colors.white}
`;


interface ProfileHeaderProps extends SettingsModalContentProps {
  text: string;
}

export const ProfileHeader = (props: ProfileHeaderProps) => {
  const { text } = props;

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
  }

  return (
    <ProfileHeaderContainer>
      <TextContainer>{text}</TextContainer>
      <SettingsButton type={"text"} shape={"circle" }icon={<SettingOutlined style={{fontSize: "1.7rem"}}/>} onClick={showModal}/>
      <SettingsModal isOpen={isModalVisible} onClose={onClose} {...props}/>
    </ProfileHeaderContainer>
  )
}

const ProfileContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const ProfileSettingsText = styled.p`
font-size: ${defaultTheme.fontSize.m};
font-family: ${defaultTheme.fontFamily.hnt};
font-weight: 700px;
margin: 0px 6px 0px 0px;
`

const ProfileContent = () => {
  return(
    <ProfileContentContainer onClick={() => {console.log("I am clicked")}}>
      <SettingOutlined/>
      <ProfileSettingsText>Settings</ProfileSettingsText>
    </ProfileContentContainer>
  )
}

interface ProfileOrganismProps extends DefaultOrganismProps {}

export const ProfileOrganism = (props: ProfileOrganismProps) => {
  const { path, footer, location} = props;

  const printerStore = PrinterStore.getInstance();

  return(
    <DefaultOrganismLayout 
      path={path}
      footer={footer}
      header={<ProfileHeader text={"Profile"} onDisablePrinter={printerStore.disablePrinter} onEnablePrinter={printerStore.enablePrinter} isConnectedToPrinter={printerStore.getPrinter() !== undefined} isEnabled={printerStore.getIsEnabled()}/>}
      content={<></>}
    />
  )
}