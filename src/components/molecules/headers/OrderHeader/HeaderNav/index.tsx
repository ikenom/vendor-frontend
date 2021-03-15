import styled from "styled-components";
import { defaultTheme } from "../../../../../defaultTheme";
import { Button } from "../../../../atoms/button";
import React from "react";
import { BackArrowIcon } from "../../../../../icons/components";
import { Divider } from "../../../../layouts/divider";
import "./index.css"
import { navigate } from "gatsby";

export interface HeaderNavProps {
  previousPagePath?: string;
  text: string;
}

export const HeaderNavContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BackArrow = styled(Button)`
  width: 14px;
  height: 14px;
  margin-right: 27%;
`;

const HeaderText = styled.p`
  font-size: ${defaultTheme.fontSize.m};
  font-family: ${defaultTheme.fontFamily.hnt};
  white-space: nowrap;
  height: 100%;
`;

export const HeaderNav = (props: HeaderNavProps) => {

  const { text } = props;

  const onClick = () => {
    navigate("/app")
  }

  return(
    <HeaderNavContainer>
      <BackArrow type={"ghost"} shape={"circle"} icon={<BackArrowIcon/>} onClick={onClick}/>
      <HeaderText>{ text }</HeaderText>
    </HeaderNavContainer>
  )
}

const HeaderNavWithDividerContainer = styled.div`
  margin-bottom: 4%;
  line-height: 4%;
`;

const HeaderNavWithDividerWrapper = styled(HeaderNav)`
  width: 67%;
  height: 65%;
  margin-bottom: 10%;
`;

const BottomDivider = styled(Divider)`
  margin-bottom: 0px;
  margin-top: 10px;
  border-top: 1px solid ${defaultTheme.colors.greyTwo};
`;

export const HeaderNavWithDivider = (props: HeaderNavProps) => {

  return(
    <HeaderNavWithDividerContainer>
      <HeaderNavWithDividerWrapper {...props}/>
      <BottomDivider />
    </HeaderNavWithDividerContainer>
  )
}