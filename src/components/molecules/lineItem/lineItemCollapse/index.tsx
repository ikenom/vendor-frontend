import { LineItemNotes } from "../../../atoms/lineItem/notes";
import { Collapse } from 'antd';
import React from "react";
import styled from "styled-components";
import { RightOutlined } from "@ant-design/icons";
import "./index.css";
import { defaultTheme } from "../../../../defaultTheme";
import { Button } from "../../../atoms/button";
import { CancelOrderIcon } from "../../../../icons/components";
import { CancelModal } from "../../modals/cancelModal";

const { Panel } = Collapse;


interface LineItemCollapseProps {
  lineItemNote: LineItemNotes;
  mealName: string;
  unavailableOnSubmit: () => any;
}

const WrappedCollapse = styled(Collapse)`
  width: 100%;
  padding: 0;
  height: 100%;
  max-height: 100%;
  font-family: ${defaultTheme.fontFamily.hnt_bold};
`;

const WrappedPanel = styled(Panel)`
  position: relative;
  margin-left: 7%;
  width: 96%;
  padding-right: 5%;
  height: 100%;
  max-height: 100%;
`;

const NotesContainer = styled.div`
  padding: 0% 8% 0% .75%;
  margin: 4% 0% 0% 0%; 
  overflow-y: scroll;
`;

const UnavailableButton = styled(Button)`
  align-self: flex-end;
  max-width: 37px;
  max-height: 33px; 
`;

const UnavailableIcon = styled(CancelOrderIcon)`
  min-width: 37px;
  min-height: 33px; 
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;


export const LineItemCollapse = (props: LineItemCollapseProps) => {
  const { lineItemNote, mealName, unavailableOnSubmit } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  }


  return (
    <WrappedCollapse
      onChange={() => {setIsOpen(!isOpen)}}
      expandIconPosition={'right'}
      expandIcon={({ isActive }) => <RightOutlined rotate={isActive ? 90 : 0} />}
      ghost
    >
      <WrappedPanel header="Instructions" key="1" showArrow={isOpen}>
        <Container>
          <NotesContainer>
            <LineItemNotes lineItemNote= {lineItemNote}/>
          </NotesContainer>
          <UnavailableButton type={"ghost"} icon={<UnavailableIcon />} onClick={showModal} />
          <CancelModal isOpen={isModalVisible} onClose={onModalClose} onSubmit={unavailableOnSubmit} lineItemHeader={{mealName}}/>
        </Container>
      </WrappedPanel>
    </WrappedCollapse>
  )
}