import styled from "styled-components";
import { MarkdownBlock } from "./MarkdownBlock";
import { SlideBlock } from './SlideBlock';
import { useAppDispatch } from "../hooks/useRedux";
import { MarkNodeCellGroup, MarkdownCell, SlideCell } from "../model/MarkNoteDocument";
import { MouseEvent } from "react";

const MarkdownBlockCell = ({ cell, id }: { cell: MarkdownCell, id: number }) => {
  const dispatch = useAppDispatch();

  return (
    <MarkdownBlock
      doc={cell.content}
      setDoc={content => { dispatch({ type: "updateMarkdown", content: content, id: id }) }}
      setFocus={focus => { dispatch({ type: "onCellForcus", id: id, focus: focus }) }}
    />
  );
}

const SlideBlockCell = ({ cell }: { cell: SlideCell }) => {
  return (
    <SlideBlock
      slide={{ html: cell.html, css: cell.css }}
    />
  );
}

const BlockCellGroupBackground = styled.div<{ $focused: boolean, $multipleSelected: boolean }>`
  display: flex;
  gap: 20px;
  flex-direction: column;
  padding: 12px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-left: 5px solid ${props => props.$focused ? "#67A4E9" : "transparent"};
  background-color: ${props => props.$multipleSelected ? "#F0F0F0" : "white"};
`;

export const BlockCellGroup = ({ group, focused }: { group: MarkNodeCellGroup, focused: boolean }) => {
  const dispatch = useAppDispatch();
  const onClickCell = (event: MouseEvent) => {
    console.log("selectCell", event.shiftKey);
    dispatch({ type: "onCellForcus", id: group.id, focus: true });
  }
  
  return (
    <BlockCellGroupBackground $focused={focused} $multipleSelected={false} onClick={onClickCell}>
      <MarkdownBlockCell cell={group.markdown} id={group.id} />
      <SlideBlockCell cell={group.slide} />
    </BlockCellGroupBackground>
  );
}