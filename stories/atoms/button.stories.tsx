import React from "react";
import { Button } from "../../src/components/atoms/button";
import { Meta } from "@storybook/react";

export default {
  title: "Atoms/Buttons",
} as Meta;

const createStory = (Element: any) => () => {
  return (
    <>
      {["primary", "default"].map((type) => {
        return (
          <div
            key={type}
            style={{
              padding: "10px 0",
              display: "flex",
              flexDirection: "row",
              fontSize:'18px',
              fontStyle:"normal",
              fontWeight:"normal",
              width: "207px",
              height: "75px",
              
            }}
          >
            <Element
              type={type}
              block={true}
              borderRadius='2px'
            >
              {type}
            </Element>
          </div>
        );
      })}
    </>
  );
};

const ButtonStory = createStory(Button);

export const Component = ButtonStory;