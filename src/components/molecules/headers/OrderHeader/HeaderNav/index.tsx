import styled from "styled-components";
import { defaultTheme } from "../../../../../defaultTheme";
import { Button } from "../../../../atoms/button";
import React from "react";
import { BackArrowIcon } from "../../../../../icons/components";
import { Divider } from "../../../../layouts/divider";
import "./index.css"
import { navigate } from "gatsby";

export interface HeaderNavProps {
  previousTab?: string;
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
  width: 20px;
  height: 20px;
`;

const HeaderText = styled.p<{needsExtraMargin: boolean}>`
  font-size: 20px;
  font-family: ${defaultTheme.fontFamily.hnt_bold};
  white-space: nowrap;
  height: 100%;
  margin-left: ${({ needsExtraMargin }) => needsExtraMargin ? "33%;" : "27%;"}
`;

export const HeaderNav = (props: HeaderNavProps) => {

  const { text, previousTab } = props;

  const onClick = () => {
    navigate("/app/order")
  }

  return(
    <HeaderNavContainer>
      <BackArrow type={"ghost"} shape={"circle"} icon={<BackArrowIcon/>} onClick={onClick}/>
      <HeaderText needsExtraMargin={text.length < 8}>{ text }</HeaderText>
    </HeaderNavContainer>
  )
}

const HeaderNavWithDividerContainer = styled.div`
  margin-bottom: 4%;
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