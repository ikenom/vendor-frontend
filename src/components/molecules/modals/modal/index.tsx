import React, { useState } from "react";
import { Button } from "../../../atoms/button";
import Modal from 'react-modal';


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
}


export const DefaultModal = (props: ModalProps) => {
  const { isOpen, onClose, title } = props;

  const onModalClose = () => {
    onClose();
  }

  return(
  <Modal
    isOpen={isOpen}
    style={customStyles}
    shouldCloseOnOverlayClick={true}
    onRequestClose={onModalClose}
    contentLabel={title}>
      {title}
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