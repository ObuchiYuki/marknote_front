import styled, { CSSProperties } from "styled-components";
import { MarkNoteCell } from "../../model/MarkNoteDocument";
import { SidebarSlideRenderView } from "./SidebarSlideRenderView";
import { R } from "../R";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { on } from "events";

const cellBorderRadius = (selected: boolean, aboveSelected: boolean, belowSelected: boolean) => {
  if (!selected) { return "0"; }
  if (aboveSelected && belowSelected) { return "0"; }
  if (aboveSelected) { return "0 0 8px 8px"; }
  if (belowSelected) { return "8px 8px 0 0"; }
  return "8px";
}

export const SidebarCellContainer = styled.div<{ $head: boolean, $selected: boolean, $aboveSelected: boolean, $belowSelected: boolean }>`
  padding: 6px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
  position: relative;
  background-color: ${props => props.$selected ? R.color.accentWithAlpha(0.2) : "transparent"};
  border-radius: ${props => cellBorderRadius(props.$selected, props.$aboveSelected, props.$belowSelected)};
  position: relative;
  
  &::before {
    content: "";
    display: ${props => props.$head ? "block" : "none"};
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

export const SidebarCellIndex = styled.span<{ $head: boolean }>`
  color: ${props => props.$head ? "white" : R.color.secondaryText};
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

  index: number,
  
  head: boolean,
  selected: boolean,
  aboveSelected: boolean,
  belowSelected: boolean,

  hidden?: boolean,
  isDragOverlay?: boolean,
  selectionCount?: number,

  onClick?: (event: React.MouseEvent) => void,
}

export const SidebarCell = ({ cell, index, head, selected, aboveSelected, belowSelected, onClick, isDragOverlay, hidden }: SidebarCellProps) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: cell.id });

  const style: CSSProperties = {
    zIndex: isDragOverlay ? 9999999 : 0,
    opacity: hidden ? 0 : 1,
    cursor: "pointer",
    position: "relative",
    boxShadow: isDragOverlay ? "0 4px 20px 0 rgba(0,0,0,0.5)" : "0 4px 20px 0 rgba(0,0,0,0)",
    transformOrigin: 'center',
    transition: transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <SidebarCellContainer 
      $head={head} 
      $selected={selected} 
      $aboveSelected={aboveSelected} 
      $belowSelected={belowSelected} 
      
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
      <SidebarCellIndex $head={head}>{ index+1 }</SidebarCellIndex>
      <SidebarSlideRenderView cell={cell} />
    </SidebarCellContainer>
  );
}
