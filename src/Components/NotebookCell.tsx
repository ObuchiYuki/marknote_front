import styled from "styled-components";
import { LegacyRef, MouseEvent, forwardRef } from "react";

import { MarkNodeCell } from "../model/MarkNoteDocument";
import { MarkdownArea } from "./MarkdownArea";
import { SlideArea } from "./SlideArea";
import { selectCell } from "../redux/thunk/cellThunks";
import { useAppDispatch } from "../hooks/useRedux";

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

  ref?: LegacyRef<HTMLDivElement>
}

export const NotebookCell = forwardRef<HTMLDivElement, NotebookCellProps>(
  ({ index, cell, multipleSelected, editing, head }, ref) => {
  const dispatch = useAppDispatch();

  const onClickCell = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    dispatch(selectCell({ index: index, allowsMultiple: event.shiftKey }));
  }

  const preventShiftSelection = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }
  
  return (
    <CellBackground 
      ref={ref}
      $head={head} 
      $multipleSelected={multipleSelected} 
      onClick={onClickCell} 
      onMouseDown={preventShiftSelection}
    >
      <MarkdownArea cell={cell.markdown} index={index} editing={editing} />
      <SlideArea slide={cell.slide} />
    </CellBackground>
  );
});