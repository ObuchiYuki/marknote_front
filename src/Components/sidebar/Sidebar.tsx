import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import styled from "styled-components";
import { SidebarCell } from "./SidebarCell";
import { escapeCell, selectCell } from "../../redux/thunk/cellThunks";
import { DndContext, DragEndEvent, DragStartEvent, MouseSensor, PointerSensor, UniqueIdentifier, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { MarkNoteCell } from "../../model/MarkNoteDocument";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const SIDEBAR_WIDTH = 150;

export type SidebarProps = {
  collapsed: boolean,
}

const SidebarCollapserContainer = styled.div<{ $collapsed: boolean }>`
  width: ${props => props.$collapsed ? "0px" : `${SIDEBAR_WIDTH}px`};
  min-width: ${props => props.$collapsed ? "0px" : `${SIDEBAR_WIDTH}px`};
  height: 100%;
  overflow: hidden;
  transition: width 0.3s;
  box-shadow: inset -6px 0px 3px -4px rgba(0, 0, 0, 0.1);
`

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px;
  overflow-y: scroll; /* Enable vertical scrollbar for overflow content */
  width: ${SIDEBAR_WIDTH}px;
  min-width: ${SIDEBAR_WIDTH}px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { doc, ui } = useAppSelector(state => state.present);
  const [activeID, setActiveID] = useState<UniqueIdentifier | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [cursorMin, cursorMax] = [ui.selectionAnchor, ui.selectionHead].sort((a, b) => a - b);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveID(active.id);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveID(null);
  };

  const handleDragCancel = () => {
    setActiveID(null);
  };

  const filterCells = (cells: MarkNoteCell[]) => {
    return cells.filter((_, index) => {
      return true
    });
  }

  const onClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.shiftKey) {
      dispatch(escapeCell());
    }
    dispatch(selectCell({ index: index, allowsMultiple: event.shiftKey }));    
  }

  return (
    <SidebarCollapserContainer $collapsed={ui.sidebarCollapsed}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        modifiers={[
          restrictToVerticalAxis
        ]}
      >

        <SortableContext
          items={filterCells(doc.cells)}
          strategy={verticalListSortingStrategy}
        >
          <SidebarContainer>
            {filterCells(doc.cells).map((cell, index) => {
              const head = ui.selectionHead === index;
              const selected = cursorMin <= index && index <= cursorMax;
              const aboveSelected = cursorMin < index;
              const belowSelected = cursorMax > index;

              return <SidebarCell
                key={index} 
                cell={cell} 
                index={index} 
                head={head} 
                selected={selected} 
                aboveSelected={aboveSelected} 
                belowSelected={belowSelected} 
                onClick={event => onClick(index, event)}
              />
            })}

          </SidebarContainer>
        </SortableContext>
      </DndContext>
    </SidebarCollapserContainer>
  );
};
