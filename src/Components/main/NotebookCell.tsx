import styled from "styled-components";
import { LegacyRef, MouseEvent, forwardRef } from "react";

import { MarkNoteCell } from "../../model/MarkNoteDocument";
import { MarkdownArea } from "./MarkdownArea";
import { SlideArea } from "./SlideArea";
import { selectCell } from "../../redux/thunk/cellThunks";
import { useAppDispatch } from "../../hooks/useRedux";
import { R } from "../R";

const cellBorderRadius = (selected: boolean, aboveSelected: boolean, belowSelected: boolean) => {
  if (!selected) { return "0"; }
  if (aboveSelected && belowSelected) { return "0"; }
  if (aboveSelected) { return "0 0 16px 16px"; }
  if (belowSelected) { return "16px 16px 0 0"; }
  return "16px";
}

const CellBackground = styled.div<{ $head: boolean, $multipleSelected: boolean, $aboveSelected: boolean, $belowSelected: boolean }>`
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-direction: column;
  background-color: ${props => props.$multipleSelected ? R.color.accentWithAlpha(0.1) : "transparent"};
  border-radius: ${props => cellBorderRadius(props.$multipleSelected, props.$aboveSelected, props.$belowSelected)};
  position: relative;

  /* border-left: 5px solid ${props => props.$head ? R.color.accent : "transparent"}; */
  &::before {
    content: "";
    display: ${props => props.$head ? "block" : "none"};
    position: absolute;
    height: calc(100% - 32px);
    width: 5px;
    top: 16px;
    left: 0px;
    border-radius: 10px;
    background-color: ${R.color.accent};
  }
`;

export type NotebookCellProps = {
  cell: MarkNoteCell,

  index: number,
  
  head: boolean,
  multipleSelected: boolean,
  aboveSelected: boolean,
  belowSelected: boolean,
  editing: boolean,

  ref?: LegacyRef<HTMLDivElement>
}

export const NotebookCell = forwardRef<HTMLDivElement, NotebookCellProps>(
  ({ index, cell, multipleSelected, aboveSelected, belowSelected, editing, head }, ref) => {
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
      $aboveSelected={aboveSelected}
      $belowSelected={belowSelected}
      onClick={onClickCell} 
      onMouseDown={preventShiftSelection}
    >
      <MarkdownArea cell={cell.markdown} index={index} editing={editing} />
      <SlideArea slide={cell.slide} />
    </CellBackground>
  );
});