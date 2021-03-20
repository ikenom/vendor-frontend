import { Meta } from "@storybook/react";
import React, { useState } from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { Button } from "../../../src/components/atoms/button";
import { AppFooter } from "../../../src/components/molecules/AppFooter";
import { DefaultModal as Modal } from "../../../src/components/molecules/modals/modal"
import { NeedsActionModal } from "../../../src/components/molecules/modals/needsAction"
import { TimeUpdateModal, ContentProps } from "../../../src/components/molecules/modals/timeUpdateModal"
import { defaultTheme } from "../../../src/defaultTheme";
export default {
  title: "Molecules/Modal/Default",
} as Meta;

const Container = styled.div`
  ${layout}
`

const CustomButton = styled(Button)`
  background-color: ${defaultTheme.colors.blue};
`;

const modalContent = () => (<AppFooter 
selectedIcon="order" 
onClicks={{
  ordersOnClick: () => {},
  inventoryOnClick: () => {},
  supportOnClick: () => {},
  profileOnClick: () => {}
}} />)

export const DefaultModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
  }

  const title = "Test Modal! ~~ <(O.O<) (>O.O)> ~~";
  
  return(
    <Container width={343} height={230}>
      <CustomButton type="primary" onClick={showModal}> Open Modal </CustomButton>
      <p>Some contents...</p>
      <Modal isOpen={isModalVisible} onClose={onClose} title={title} content={modalContent()} onSubmit={() => {}} buttonLabel="Confirm"/>
    </Container>
  )
}

export const NeedsActionModalExample = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
  }
  
  return(
    <Container width={343} height={230}>
      <CustomButton type="primary" onClick={showModal}> Open Modal </CustomButton>
      <p>Some contents...</p>
      <NeedsActionModal isOpen={isModalVisible} onClose={onClose} onSubmit={() => {}}/>
    </Container>
  )
}

export const SubmitToKitchenModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
  }

  const contentProps: ContentProps = {
    orderDetails: {
      label: "Bubba B.",
      content: "Order #41",
      withoutBar: true
    },
    showTimeRemaining: false,
    modalType: "Send To Kitchen",
    onUpdate: (num) => console.log(num)
  }
  
  return(
    <Container width={343}>
      <CustomButton type="primary" onClick={showModal}> Open Modal </CustomButton>
      <p>Some contents...</p>
      <TimeUpdateModal type={"Send To Kitchen"} isOpen={isModalVisible} onClose={onClose} onSubmit={() => {}} contentProps={contentProps}/>
    </Container>
  )
}