import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import './index.css';

const { Header, Footer, Content } = Layout;

export type LayoutType = "default" | "largerHeader"

export interface BasicLayoutProps {
  header: JSX.Element,
  headerStyle?: {
    color?: string
  }
  content: JSX.Element,
  contentStyle?: {
    color?: string
  }
  footer: JSX.Element,
  footerStyle?: {
    color?: string
  }
}

const StyledLayout = styled(Layout)`
  height: 100vh;
  width: 100%;
`;

const HeaderLayout = styled(Header)<{ color: string | undefined }>`
  height: 5%;
  width: 100%;
  background: transparent;
  padding: 0px;
  ${({ color }) => color !== undefined ? `background-color: ${color}` : ''}
`;

const FooterLayout = styled(Footer)<{ color: string | undefined }>`
  height: 15%;
  width: 100%;
  padding: 0;
  margin-top: 0%
  ${({ color }) => color !== undefined ? `background-color: ${color}` : ''}
`;

const ContentLayout = styled(Content)<{ color: string | undefined }>`
  height: 80%;
  width: 100%;
  overflow-y: scroll;
  margin-left: 3%;
  margin-right: 3%;
  margin-top: 1%;
  ${({ color }) => color !== undefined ? `background-color: ${color}` : ''}
`;

const BaseLayout = (props: BasicLayoutProps) => {
  const { header, content, footer, headerStyle, contentStyle, footerStyle } = props;
  const { color: headerColor } = headerStyle  || {}
  const { color: contentColor } = contentStyle || {};
  const { color: footerColor } = footerStyle || {};
  return (
    <StyledLayout>
      <HeaderLayout color={headerColor}>
        {header}
      </HeaderLayout>
      <ContentLayout color={contentColor}>
        {content}
      </ContentLayout>
      <FooterLayout color={footerColor}>
        {footer}
      </FooterLayout>
    </StyledLayout>
  )
}


export const BasicLayout = styled(BaseLayout)<BasicLayoutProps>`
  width: 100%;
  minHeight: 100vh;
  max-width: 700px;
  overflow: hidden;
`;

export default BasicLayout