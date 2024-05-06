import styled from "styled-components";
import { LegacyRef, MouseEvent, forwardRef } from "react";

import { MarkNoteCell } from "../../model/MarkNoteDocument";
import { MarkdownArea } from "./MarkdownArea";
import { SlideArea } from "./SlideArea";
import { editCell, escapeCell, selectCell } from "../../redux/thunk/cellThunks";
import { useAppDispatch } from "../../hooks/useRedux";
import { R } from "../R";

const cellBorderRadius = (isSelected: boolean, isAboveSelected: boolean, isBelowSelected: boolean) => {
  if (!isSelected) { return "0"; }
  if (isAboveSelected && isBelowSelected) { return "0"; }
  if (isAboveSelected) { return "0 0 16px 16px"; }
  if (isBelowSelected) { return "16px 16px 0 0"; }
  return "16px";
}

const CellBackground = styled.div<{ $isHead: boolean, $isMultipleSelected: boolean, $isAboveSelected: boolean, $isBelowSelected: boolean }>`
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-direction: column;
  background-color: ${props => props.$isMultipleSelected ? R.color.accentWithAlpha(0.1) : "transparent"};
  border-radius: ${props => cellBorderRadius(props.$isMultipleSelected, props.$isAboveSelected, props.$isBelowSelected)};
  position: relative;

  &::before {
    content: "";
    display: ${props => props.$isHead ? "block" : "none"};
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
  
  isHead: boolean,
  isMultipleSelected: boolean,
  isAboveSelected: boolean,
  isBelowSelected: boolean,
  isEditing: boolean,

  ref?: LegacyRef<HTMLDivElement>
}

export const NotebookCell = forwardRef<HTMLDivElement, NotebookCellProps>(
  ({ index, cell, isMultipleSelected, isAboveSelected, isBelowSelected, isEditing: editing, isHead }, ref) => {
  const dispatch = useAppDispatch();

  const onClickCell = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.shiftKey) {
      dispatch(escapeCell());
    }
    dispatch(selectCell({ index: index, allowsMultiple: event.shiftKey }));
  }

  const preventShiftSelection = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }
  
  return (
    <CellBackground 
      ref={ref}
      $isHead={isHead} 
      $isMultipleSelected={isMultipleSelected} 
      $isAboveSelected={isAboveSelected}
      $isBelowSelected={isBelowSelected}
      onClick={onClickCell} 
      onMouseDown={preventShiftSelection}
    >
      <MarkdownArea cell={cell.markdown} index={index} editing={editing} />
      <SlideArea slide={cell.slide} />
    </CellBackground>
  );
});