import React from "react";
import { defaultTheme } from "../../src/defaultTheme"
import { Caret } from "../../src/components/atoms/arrows";
import { Meta } from "@storybook/react";

export default {
  title: "Atoms/Carets",
} as Meta;

export const UpCaret = () => {
  return (
  <>
  {
    ["10px", "15px", "20px", "25px", "30px"].map((size) => {
      return(
        <Caret type="up" color={defaultTheme.colors.red} style={{fontSize: size}}/>
      )
    })
  }
  {
    ["10px", "15px", "20px", "25px", "30px"].map((size) => {
      return(
        <Caret type="up" color={defaultTheme.colors.green} style={{fontSize: size}}/>
      )
    })
  }
  {
    ["10px", "15px", "20px", "25px", "30px"].map((size) => {
      return(
        <Caret type="up" color={defaultTheme.colors.yellow} style={{fontSize: size}}/>
      )
    })
  }
  </>
)}

export const DownCaret = () => {
  return (
  <>
  {
    ["10px", "15px", "20px", "25px", "30px"].map((size) => {
      return(
        <Caret rotate={180} color={defaultTheme.colors.red} style={{fontSize: size}}/>
      )
    })
  }
  {
    ["10px", "15px", "20px", "25px", "30px"].map((size) => {
      return(
        <Caret rotate={180} color={defaultTheme.colors.green} style={{fontSize: size}}/>
      )
    })
  }
  {
    ["10px", "15px", "20px", "25px", "30px"].map((size) => {
      return(
        <Caret rotate={180} color={defaultTheme.colors.yellow} style={{fontSize: size}}/>
      )
    })
  }
  </>
)}