import React from "react";
import { BasicLayout } from "../../src/components/layouts/basic";
import { Meta } from "@storybook/react";
import styled from "styled-components";

export default {
  title: "Layouts/Basic",
} as Meta;


const header = () => (
    <p>Header Header</p>
);

const footer = () => (
    <p>Footer Footer</p>
);

const content = () => (
    <p>Content content content</p>
)

export const Layout = () => {
  return(
    <div style={{height: "100vh", width: "100%"}}>
      <BasicLayout 
        header={header()} 
        headerStyle={{color: '#FF2727'}} 
        footer={footer()} 
        footerStyle={{color: '#FF2727'}} 
        content={content()} 
        contentStyle={{color: '#F8F078'}}
      />
    </div>
  )
}
