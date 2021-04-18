import React from "react";
import styled from "styled-components";
import { Typography } from 'antd';

import { defaultTheme } from "../../../../defaultTheme";
const { Paragraph } = Typography;


interface LineItemNotesProps {
  lineItemNote: LineItemNotes;
}

export interface LineItemNotes {
  instructions: string;
  additionalComments: Note;
}

interface Note {
  title: string;
  details: string;
}

const Title = styled.p`
  font-size: ${defaultTheme.fontSize.default};
  font-family: ${defaultTheme.fontFamily.hnt_bold};
  color: ${defaultTheme.colors.black};
  max-height: 32%;
  width: 100%;
  max-width: 100%;
  margin-bottom: 5px;
`;

const Details = styled(Paragraph)`
  font-size: ${defaultTheme.fontSize.xsm};
  font-family: ${defaultTheme.fontFamily.hnt};
  color: ${defaultTheme.colors.black};
  height: 60%
  max-height: 60%;
  width: 100%;
  max-width: 100%;
  margin-bottom: 14px;
  word-wrap: break-word;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const LineItemNotes = (props: LineItemNotesProps) => {
  const { lineItemNote: { additionalComments, instructions }} = props;

  return (
    <Container>
      <Details ellipsis={false}>{instructions}</Details>
      <LineItemNote {...additionalComments}/>
    </Container>
  )
}

const LineItemNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LineItemNote = (props: Note) => {
  const { title, details } = props;
  return(
    <LineItemNoteContainer key={title}>
      <Title>{title}</Title>
      <Details ellipsis={false}>{details}</Details>
    </LineItemNoteContainer>
  )
}
