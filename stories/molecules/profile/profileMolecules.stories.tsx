import { Meta } from "@storybook/react";
import React from "react";
import styled from "styled-components";
import { layout } from "styled-system";
import { ProfileHeader } from "../../../src/components/organisms/profile"

export default {
  title: "Molecules/Profile/Content",
} as Meta;

const Container = styled.div`
  ${layout}
`

export const  ProfilePage = () => {

  const [isEnabled, setEnable] = React.useState(false);
  return(
    <Container width={343} height={547}>
      <ProfileHeader text={"Profile"} onDisablePrinter={() => {setEnable(false)}} onEnablePrinter={() => setEnable(true)} isConnectedToPrinter={true} isEnabled={isEnabled}/>
    </Container>
  )
}