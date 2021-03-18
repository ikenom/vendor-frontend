import React from "react";
import styled from "styled-components";
import { Typography } from 'antd';

import { defaultTheme } from "../../../../defaultTheme";
const { Paragraph } = Typography;


interface LineItemNotesProps {
  lineItemNote: LineItemNotes
}

export interface LineItemNotes {
  instructions: Note;
  additionalComments: Note;
}

interface Note {
  title: string;
  details: string;
}

const Title = styled.p`
  font-size: ${defaultTheme.fontSize.sm};
  font-family: ${defaultTheme.fontFamily.hnt};
  color: ${defaultTheme.colors.greyTwo};
  font-weight: 700;
  max-height: 32%;
  width: 100%;
  max-width: 100%;
  margin-bottom: 5px;
`;

const Details = styled(Paragraph)`
  font-size: ${defaultTheme.fontSize.default};
  font-family: ${defaultTheme.fontFamily.hnt};
  color: ${defaultTheme.colors.greyTwo};
  font-weight: 400;
  height: 60%
  max-height: 60%;
  width: 100%;
  max-width: 100%;
  margin-bottom: 14px;
  word-wrap: break-word;
`;

export const LineItemNotes = (props: LineItemNotesProps) => {
  const { lineItemNote: { additionalComments, instructions } } = props;

  return (
    <>
      <LineItemNote {...instructions}/>
      <LineItemNote {...additionalComments}/>
    </>
  )
}

export const LineItemNote = (props: Note) => {
  const { title, details } = props;
  return(
    <React.Fragment key={title}>
      <Title>{title}</Title>
      <Details ellipsis={true}>{details}</Details>
    </React.Fragment>
  )
}
