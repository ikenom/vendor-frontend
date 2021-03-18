import * as React from "react";
import { navigate } from "gatsby"
import { startup } from "../startup";

/**
 *
 * Gatsbys entry point is "/". All we do here is navigate to "/app"
 */
const IndexPage = () => {
  React.useEffect(() => {
    navigate("/app")
  })
  return (
    <>
    </>
  )
};

startup()

export default IndexPage;