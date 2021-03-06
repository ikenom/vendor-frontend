import React from "react";
import { Button } from "../../src/components/atoms/button";
import { Meta } from "@storybook/react";
import styled from "styled-components";
import { width, border } from "styled-system";
import { BackArrowIcon, MessageIcon, MoreOptionsIcon, PhoneIcon, SearchIcon, SelectableIcon, SelectedOrderIcon } from "../../src/icons/components";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"
export default {
  title: "Atoms/Buttons",
} as Meta;

const Container = styled.div`
  ${width}
  display: flex;
  flex-direction: row;
  height: 49px;
  margin-bottom: 40px;
`

export const IconButtons = () => {
  return (
    <>
      <Container width={75}>
        <Button type={"ghost"} icon={<SelectedOrderIcon/>}/>
      </Container>
      <Container width={75}>
        <Button type={"ghost"} icon={<SelectableIcon isSelected={true} type={"inventory"}/>}/>
      </Container>
      <Container width={75}>
        <Button type={"ghost"} icon={<SelectableIcon isSelected={false} type={"inventory"}/>}/>
      </Container>
      <Container width={75}>
        <Button type={"ghost"} icon={<SelectableIcon isSelected={true} type={"support"}/>}/>
      </Container>
      <Container width={75}>
        <Button type={"ghost"} icon={<SelectableIcon isSelected={false} type={"support"}/>}/>
      </Container>
      <Container width={75}>
        <Button type={"ghost"} icon={<SelectableIcon isSelected={true} type={"order"}/>}/>
      </Container>
      <Container width={75}>
        <Button type={"ghost"} icon={<SelectableIcon isSelected={false} type={"order"}/>}/>
      </Container>
      <Container width={75}>
        <Button type={"ghost"} icon={<SelectableIcon isSelected={true} type={"profile"}/>}/>
      </Container>
      <Container width={75}>
        <Button type={"ghost"} icon={<SelectableIcon isSelected={false} type={"profile"}/>}/>
      </Container>
      <Container width={75} border={'1px solid'}>
        <Button type={"ghost"} shape={"circle"} icon={<SearchIcon/>}/>
      </Container>
      <Container width={75} >
        <Button type={"ghost"} shape={"circle"} icon={<PhoneIcon/>}/>
      </Container>
      <Container width={75} >
        <Button type={"ghost"} shape={"circle"} icon={<MessageIcon/>}/>
      </Container>
      <Container width={75} >
        <Button type={"ghost"} shape={"circle"} icon={<BackArrowIcon/>}/>
      </Container>
      <Container width={75} >
        <Button type={"ghost"} shape={"circle"} icon={<MoreOptionsIcon/>}/>
      </Container>
      <Container width={75} >
        <Button type={"ghost"} icon={<PlusOutlined/>}/>
      </Container>
      <Container width={75} >
        <Button type={"ghost"} icon={<MinusOutlined/>}/>
      </Container>
    </>
  );
};