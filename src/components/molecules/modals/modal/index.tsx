import React, { useState } from "react";
import { Button } from "../../../atoms/button";
import Modal from 'react-modal';
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme";

const Header = styled.p`
  max-width: 100%;
  max-height: 36%;
  margin: 7% 0% 9% 0%;
  font-size: ${defaultTheme.fontSize.lg};
  font-family: ${defaultTheme.fontFamily.hnt};
`;

const ContentContainer = styled.div`
  max-width: 100%;
  margin: 0% 0% 9% 0%;
`;

const ButtonContainer = styled(Button)`
  background-color: ${defaultTheme.colors.blue};
  color: ${defaultTheme.colors.white};
  max-height: 50px;
`;


const customStyles = {
  overlay: {
    backgroundColor: '#777778',
    opacity: .7
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
  }
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => any; 
  title: string;
  content: JSX.Element;
  onSubmit: () => any;
  buttonLabel: string;
}


export const DefaultModal = (props: ModalProps) => {
  const { isOpen, onClose, onSubmit, title, content, buttonLabel } = props;

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
      <Header>{title}</Header>
      <ContentContainer>{content}</ContentContainer>
      <ButtonContainer onClick={modalOnClick}>{buttonLabel}</ButtonContainer>
  </Modal>
  )
}

/**
 * 1) Modal 1 Needs Action Modal (Pause / Cancel)
 *  2) Modal 2 In Kitchen
 * 3) Modal 3 Ready
 * 4) Modal 4 Cancel
 * 5) Modal 5 Needs Action (Send Kitchen)
 */ 