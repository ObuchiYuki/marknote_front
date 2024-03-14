import styled from "styled-components";
import { MouseEvent } from "react";

import { useAppDispatch } from "../hooks/useRedux";
import { MarkNodeCellGroup } from "../model/MarkNoteDocument";
import { MarkdownArea } from "./MarkdownArea";
import { SlideArea } from "./SlideArea";

const CellBackground = styled.div<{ $focused: boolean, $multipleSelected: boolean }>`
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-direction: column;
  border-left: 5px solid ${props => props.$focused ? "#67A4E9" : "transparent"};
  background-color: ${props => props.$multipleSelected ? "#67a4e925" : "transparent"};
`;

export type NotebookCellProps = {
  group: MarkNodeCellGroup,
  multipleSelected: boolean,
  editing: boolean,
  focused: boolean,
}

export const NotebookCell = ({ group, multipleSelected, editing, focused }: NotebookCellProps) => {
  const dispatch = useAppDispatch();
  const onClickCell = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({ type: "selectCell", id: group.id, allowsMultiple: event.shiftKey });
  }

  const preventShiftSelection = (event: MouseEvent) => {
    event.preventDefault();
  }
  
  return (
    <CellBackground 
      $focused={focused} 
      $multipleSelected={multipleSelected} 
      onClick={onClickCell} 
      onMouseDown={preventShiftSelection}
    >
      <MarkdownArea cell={group.markdown} id={group.id} editing={editing} />
      <SlideArea slide={group.slide} />
    </CellBackground>
  );
}