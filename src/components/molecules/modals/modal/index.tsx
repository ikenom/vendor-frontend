import React from "react";
import { Button } from "../../../atoms/button";
import Modal from 'react-modal';
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";

const HeaderContainer = styled.div`
  max-width: 100%;
  max-height: 30%;
  margin: 7% 0% 9% 0%;
`;

export const ModalHeader = styled.p`
  font-size: ${defaultTheme.fontSize.lg};
  font-family: ${defaultTheme.fontFamily.hnt};
  font-weight: 700;
`;

const ContentContainer = styled.div`
  max-width: 100%;
  margin: 0% 0% 9% 0%;
`;

const ButtonContainer = styled(Button)`
  background-color: ${defaultTheme.colors.blue};
  color: ${defaultTheme.colors.white};
  max-height: 50px;
  &:hover {
    background-color: ${defaultTheme.colors.blue};
  }
`;


const customStyles = {
  overlay: {
    backgroundColor: 'rgb(119, 119, 120, .6)',
    opacity: 1
  },
  content : {
    // Centers modal
    top: '50%',
    left: '50%',
    width: '88%',
    maxWidth: '88%',
    minHeight: '40%',
    maxHeight: '75%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: `${defaultTheme.colors.white}`
  }
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => any; 
  title: string;
  titleComponent?: JSX.Element;
  content: JSX.Element;
  onSubmit: (data?: any) => any;
  buttonLabel: string;
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
    isOpen={isOpen}
    style={customStyles}
    shouldCloseOnOverlayClick={true}
    onRequestClose={onModalClose}
    contentLabel={title}>
      <HeaderContainer>{ titleComponent ? titleComponent : <ModalHeader>{title}</ModalHeader>}</HeaderContainer>
      <ContentContainer>{content}</ContentContainer>
      <ButtonContainer onClick={modalOnClick}>{buttonLabel}</ButtonContainer>
  </Modal>
  )
}