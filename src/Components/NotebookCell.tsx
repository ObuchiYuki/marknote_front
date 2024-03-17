import styled from "styled-components";
import { MouseEvent } from "react";

import { useAppDispatch } from "../hooks/useRedux";
import { MarkNodeCell } from "../model/MarkNoteDocument";
import { MarkdownArea } from "./MarkdownArea";
import { SlideArea } from "./SlideArea";

const CellBackground = styled.div<{ $head: boolean, $multipleSelected: boolean }>`
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-direction: column;
  border-left: 5px solid ${props => props.$head ? "#67A4E9" : "transparent"};
  background-color: ${props => props.$multipleSelected ? "#67a4e925" : "transparent"};
`;

export type NotebookCellProps = {
  cell: MarkNodeCell,

  index: number,
  
  head: boolean,
  multipleSelected: boolean,
  editing: boolean,
}

export const NotebookCell = ({ cell, index, head, multipleSelected, editing }: NotebookCellProps) => {
  const dispatch = useAppDispatch();
  const onClickCell = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch({ type: "selectCell", index: index, allowsMultiple: event.shiftKey });
  }

  const preventShiftSelection = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }
  
  return (
    <CellBackground 
      $head={head} 
      $multipleSelected={multipleSelected} 
      onClick={onClickCell} 
      onMouseDown={preventShiftSelection}
    >
      <MarkdownArea cell={cell.markdown} index={index} editing={editing} />
      <SlideArea slide={cell.slide} />
    </CellBackground>
  );
}