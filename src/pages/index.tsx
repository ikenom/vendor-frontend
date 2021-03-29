import * as React from "react";
import { navigate } from "gatsby"
import { startup } from "../startup";
import '@hookstate/devtools';

/**
 *
 * Gatsbys entry point is "/". All we do here is navigate to "/app"
 */
const IndexPage = () => {
  React.useEffect(() => {
  startup()
    navigate("/app")
  })
  return (
    <>
    </>
  )
};

export default IndexPage;