import React from "react";
import { Button } from "../../../atoms/button";
import Modal from 'react-modal';
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";

const HeaderContainer = styled.div`
  max-width: 100%;
  max-height: 30%;
  margin: 5% 0% 7% 0%;
`;

export const ModalHeader = styled.p`
  font-size: ${defaultTheme.fontSize.lg};
  font-family: ${defaultTheme.fontFamily.hnt_extra_bold};
`;

const ContentContainer = styled.div`
  max-width: 100%;
  margin: 0% 0% 9% 0%;
`;

const ButtonContainer = styled(Button)`
  background-color: ${defaultTheme.colors.blue};
  color: ${defaultTheme.colors.white};
  max-height: 60px;
  font-family: ${defaultTheme.fontFamily.hnt_medium};
  &:hover {
    background-color: ${defaultTheme.colors.blue};
  }
  height: 2.6rem;
  border-radius: 10px;
  margin-bottom: 6px;
  align-self: flex-end;
`;


const customStyles = {
  overlay: {
    backgroundColor: 'rgb(119, 119, 120, .6)',
    opacity: 1,
    zIndex: 1000,
  },
  content : {
    // Centers modal
    top: '50%',
    left: '50%',
    width: '90%',
    maxWidth: '90%',
    minHeight: '35%',
    maxHeight: '75%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: `${defaultTheme.colors.white}`,
    fontFamily: "Helvetica Now Text Medium",
    borderRadius: '35px',
    padding: '25px',
  }
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => any; 
  title: string;
  titleComponent?: JSX.Element;
  content: JSX.Element;
  onSubmit: (data?: any) => any;
  buttonLabel?: string;
}


export const DefaultModal = (props: ModalProps) => {
  const { isOpen, onClose, onSubmit, title, content, buttonLabel, titleComponent } = props;

  // Placeholder for any custom logic we might need
  const onModalClose = () => {
    onClose();
  }

  const modalOnClick = () => {
    onSubmit();
    onModalClose();
  }

  return(
  <Modal
    ariaHideApp={false}
    isOpen={isOpen}
    style={customStyles}
    shouldCloseOnOverlayClick={true}
    onRequestClose={onModalClose}
    contentLabel={title}>
      <HeaderContainer>{ titleComponent ? titleComponent : <ModalHeader>{title}</ModalHeader>}</HeaderContainer>
      <ContentContainer>{content}</ContentContainer>
      {buttonLabel ? (<ButtonContainer onClick={modalOnClick}>{buttonLabel}</ButtonContainer>) : <></>}
  </Modal>
  )
}