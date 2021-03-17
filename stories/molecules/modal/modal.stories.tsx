import { Meta } from "@storybook/react";
import React, { useState } from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { Button } from "../../../src/components/atoms/button";
import { DefaultModal as Modal } from "../../../src/components/molecules/modals/modal"
export default {
  title: "Molecules/Modal/Default",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const DefaultModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onClose = () => {
    setIsModalVisible(false);
  }
  
  return(
    <Container width={343} height={230}>
      <Button type="primary" onClick={showModal} color="#4785FE"> Open Modal </Button>
      <p>Some contents...</p>
      <Modal isOpen={isModalVisible} onClose={onClose} title={"Test Modal! ~~ <(O.O<) (>O.O)> ~~"}/>
    </Container>
  )
}