import * as React from "react";
import { navigate } from "gatsby"
import '@hookstate/devtools';

/**
 *
 * Gatsbys entry point is "/". All we do here is navigate to "/app"
 */
const IndexPage = () => {
  React.useEffect(() => {
    navigate("/app/order")
  })
  return (
    <>
    </>
  )
};

export default IndexPage;