import styled, { CSSProperties } from "styled-components";
import { MarkNoteCell } from "../../model/MarkNoteDocument";
import { SidebarSlideRenderView } from "./SidebarSlideRenderView";
import { R } from "../R";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CELL_SELECTION_CORNER_RADIUS = 9;

const cellBorderRadius = (isSelected: boolean, isAboveSelected: boolean, isBelowSelected: boolean) => {
  if (!isSelected) { return "0"; }
  if (isAboveSelected && isBelowSelected) { return "0"; }
  if (isAboveSelected) { return `0 0 ${CELL_SELECTION_CORNER_RADIUS}px ${CELL_SELECTION_CORNER_RADIUS}px`; }
  if (isBelowSelected) { return `${CELL_SELECTION_CORNER_RADIUS}px ${CELL_SELECTION_CORNER_RADIUS}px 0 0`; }
  return `${CELL_SELECTION_CORNER_RADIUS}px`;
}

const SidebarCellContainer = styled.div<{ $isHead: boolean, $isSelected: boolean, $isAboveSelected: boolean, $isBelowSelected: boolean }>`
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: flex-end;
  gap: 4px;
  position: relative;
  background-color: ${props => props.$isSelected ? R.color.accentWithAlpha(0.2) : "transparent"};
  border-radius: ${props => cellBorderRadius(props.$isSelected, props.$isAboveSelected, props.$isBelowSelected)};
  
  &::before {
    content: "";
    display: ${props => props.$isHead ? "block" : "none"};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${CELL_SELECTION_CORNER_RADIUS}px;
    z-index: -1;
    background-color: ${R.color.accent}
  }
`

export const SidebarCellIndex = styled.span<{ $isHead: boolean, $isDragOverlay: boolean }>`
  color: ${props => props.$isHead ? "white" : R.color.secondaryText};
  opacity: ${props => props.$isDragOverlay ? 0 : 1};
  font-size: 11px;
  font-weight: 400;
  width: 11px;  
  min-width: 11px;
  max-width: 11px;
  text-align: right;
`

export type SidebarCellProps = {
  cell: MarkNoteCell,
  gragSubCell?: MarkNoteCell,

  isHead: boolean,
  isSelected: boolean,
  isAboveSelected: boolean,
  isBelowSelected: boolean,

  isHidden?: boolean,
  isDragOverlay?: boolean,
  selectionCount?: number,

  onPointerDown?: (event: React.MouseEvent) => void,
  onClick?: (event: React.MouseEvent) => void,
}

export const SidebarCell = ({ cell, isHead, isSelected, isAboveSelected, isBelowSelected, onPointerDown, onClick, isDragOverlay, isHidden }: SidebarCellProps) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: cell.id });

  const style: CSSProperties = {
    zIndex: isDragOverlay ? 9999999 : 0,
    opacity: isHidden ? 0 : 1,
    cursor: "pointer",
    position: "relative",
    transformOrigin: 'center',
    transition: transition,
    transform: CSS.Transform.toString(transform),
  };

  const listenersPointerDown = (event: React.PointerEvent) => {
    if (!(listeners as any)?.onPointerDown) { return; }
    (listeners as any).onPointerDown(event);
  }

  return (
    <SidebarCellContainer 
      $isHead={isHead} 
      $isSelected={isSelected} 
      $isAboveSelected={isAboveSelected} 
      $isBelowSelected={isBelowSelected} 
      
      ref={setNodeRef} 
      style={style} 
      onClick={event => {
        onClick?.(event);
        event.stopPropagation();
        event.preventDefault();
      }}
      onPointerDown={event => {
        onPointerDown?.(event);
        listenersPointerDown(event);
        event.stopPropagation();
        event.preventDefault();
      }}
      onDoubleClick={event => {
        event.stopPropagation();
        event.preventDefault();
      }}
      {...attributes}
    >
      <SidebarCellIndex 
        $isHead={isHead}
        $isDragOverlay={isDragOverlay ?? false}
      >
      { cell.page }
      </SidebarCellIndex>
      <SidebarSlideRenderView 
        cell={cell} 
        isDragOverlay={isDragOverlay}
      />
    </SidebarCellContainer>
  );
}
