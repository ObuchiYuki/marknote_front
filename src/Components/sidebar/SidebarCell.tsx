import styled, { CSSProperties } from "styled-components";
import { MarkNoteCell } from "../../model/MarkNoteDocument";
import { SidebarSlideRenderView } from "./SidebarSlideRenderView";
import { R } from "../R";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const cellBorderRadius = (isSelected: boolean, isAboveSelected: boolean, isBelowSelected: boolean) => {
  if (!isSelected) { return "0"; }
  if (isAboveSelected && isBelowSelected) { return "0"; }
  if (isAboveSelected) { return "0 0 8px 8px"; }
  if (isBelowSelected) { return "8px 8px 0 0"; }
  return "8px";
}

export const SidebarCellContainer = styled.div<{ $isHead: boolean, $isSelected: boolean, $isAboveSelected: boolean, $isBelowSelected: boolean }>`
  padding: 6px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
  position: relative;
  background-color: ${props => props.$isSelected ? R.color.accentWithAlpha(0.2) : "transparent"};
  border-radius: ${props => cellBorderRadius(props.$isSelected, props.$isAboveSelected, props.$isBelowSelected)};
  position: relative;
  
  &::before {
    content: "";
    display: ${props => props.$isHead ? "block" : "none"};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: ${R.color.accent}
  }
`

export const SidebarCellIndex = styled.span<{ $isHead: boolean }>`
  color: ${props => props.$isHead ? "white" : R.color.secondaryText};
  font-size: 10px;
  font-weight: 600;
  width: 11px;  
  min-width: 11px;
  max-width: 11px;
  text-align: right;
  transform: translateY(-2px);
`

export type SidebarCellProps = {
  cell: MarkNoteCell,

  isHead: boolean,
  isSelected: boolean,
  isAboveSelected: boolean,
  isBelowSelected: boolean,

  isHidden?: boolean,
  isDragOverlay?: boolean,
  selectionCount?: number,

  onClick?: (event: React.MouseEvent) => void,
}

export const SidebarCell = ({ cell, isHead, isSelected, isAboveSelected, isBelowSelected, onClick, isDragOverlay, isHidden }: SidebarCellProps) => {

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
    boxShadow: isDragOverlay ? "0 4px 20px 0 rgba(0,0,0,0.5)" : "0 4px 20px 0 rgba(0,0,0,0)",
    transformOrigin: 'center',
    transition: transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <SidebarCellContainer 
      $isHead={isHead} 
      $isSelected={isSelected} 
      $isAboveSelected={isAboveSelected} 
      $isBelowSelected={isBelowSelected} 
      
      onClick={onClick}
      ref={setNodeRef} 
      style={style} 
      onMouseDown={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDoubleClick={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
      {...attributes}
      {...listeners}
    >
      <SidebarCellIndex $isHead={isHead}>{ cell.page }</SidebarCellIndex>
      <SidebarSlideRenderView cell={cell} />
    </SidebarCellContainer>
  );
}
