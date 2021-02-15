import * as React from "react";
import { Media } from "../Media";

// TODO add react helmet for header wrapper (SEO, viewport, etc.)
const IndexPage = () =>
  <>
    <Media at="xs">Hello mobile!</Media>
    <Media greaterThan="xs">Hello desktop/laptop! Omekam</Media>
  </>;

export default IndexPage;