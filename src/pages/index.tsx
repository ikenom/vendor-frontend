import * as React from "react";
import { navigate } from "gatsby"

/**
 * 
 * Gatsbys entry point is "/". All we do here is navigate to "/app"
 */
const IndexPage = () => {
  return (
    <>
    {navigate("/app")}
    </>
  )
};

export default IndexPage;