import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import styled from "styled-components";
import { SidebarCell } from "./SidebarCell";
import { escapeCell, moveSelectedCells, selectCell } from "../../redux/thunk/cellThunks";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, MouseSensor, PointerSensor, UniqueIdentifier, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { MarkNoteCell } from "../../model/MarkNoteDocument";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { createPortal } from "react-dom";
import { SidebarCellDraggingOverlay } from "./SidebarCellDraggingOverlay";

const SIDEBAR_WIDTH = 150;

export type SidebarProps = {
  isCollapsed: boolean,
}

const SidebarCollapserContainer = styled.div<{ $collapsed: boolean }>`
  width: ${props => props.$collapsed ? "0px" : `${SIDEBAR_WIDTH}px`};
  min-width: ${props => props.$collapsed ? "0px" : `${SIDEBAR_WIDTH}px`};
  height: 100%;
  overflow: hidden;
  transition: width 0.3s;
  background-color: #D8DDE4;
  box-shadow: inset -6px 0px 3px -4px rgba(0, 0, 0, 0.1);
`

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px;
  overflow-y: scroll; 
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
  const [cursorMin, cursorMax] = [ui.selectionAnchor, ui.selectionHead].sort((a, b) => a - b);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 20 } }),
    useSensor(PointerSensor, { activationConstraint: { distance: 20 } }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveID(active.id);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const over = event.over?.id;
    const overIndex = doc.cells.findIndex(cell => cell.id === over);
    if (overIndex == null) { return; }

    dispatch(moveSelectedCells({ index: overIndex }));
    
    setActiveID(null);
  };

  const handleDragCancel = () => {
    setActiveID(null);
  };

  const filterCells = (cells: MarkNoteCell[]): [MarkNoteCell, number][] => {
    if (!activeID) { return cells.map((cell, index) => [cell, index]); }
    return cells
      .map((cell, index) => [cell, index] as [MarkNoteCell, number])
      .filter(([cell, index]) => cell.id === activeID || !(cursorMin <= index && index <= cursorMax))
  }

  const onPointerDown = (cell: MarkNoteCell, event: React.MouseEvent) => {
    const index = doc.cells.findIndex(c => c.id === cell.id);
    if (index == null || (cursorMin <= index && index <= cursorMax)) { return; }
    if (event.shiftKey) { dispatch(escapeCell()); }
    dispatch(selectCell({ index: index, allowsMultiple: event.shiftKey }));    
  }

  const onClick = (cell: MarkNoteCell, event: React.MouseEvent) => {
    const index = doc.cells.findIndex(c => c.id === cell.id);
    if (index == null) { return; }
    if (event.shiftKey) { dispatch(escapeCell()); }
    dispatch(selectCell({ index: index, allowsMultiple: event.shiftKey })); 
  }

  const renderDragOverlay = (id: UniqueIdentifier) => {
    const cell = doc.cells.find(cell => cell.id === id);
    if (!cell) { return null; }
    const subCell1 = doc.cells.find((cell, index) => 
      cell.id !== id && cursorMin <= index && index <= cursorMax
    );
    const subCell2 = doc.cells.find((cell, index) => 
      cell.id !== id && cell.id !== subCell1?.id && cursorMin <= index && index <= cursorMax
    );
    return (
      <SidebarCellDraggingOverlay cell={cell} subCell1={subCell1} subCell2={subCell2}/>
    );
  };

  return (
    <SidebarCollapserContainer $collapsed={ui.sidebarCollapsed}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        modifiers={[restrictToVerticalAxis]}
      >

        <SortableContext
          items={filterCells(doc.cells).map(([cell, _]) => cell)}
          strategy={verticalListSortingStrategy}
        >
          <SidebarContainer>
            {filterCells(doc.cells).map(([cell, index]) => {
              const head = ui.selectionHead === index;
              const selected = cursorMin <= index && index <= cursorMax;
              const aboveSelected = cursorMin < index;
              const belowSelected = cursorMax > index;

              return <SidebarCell
                key={cell.id}
                cell={cell}
                isHead={head} 
                isSelected={selected} 
                isAboveSelected={aboveSelected} 
                isBelowSelected={belowSelected} 
                isHidden={activeID === cell.id}
                onPointerDown={event => onPointerDown(cell, event)}
                onClick={event => onClick(cell, event)}
              />
            })}
          </SidebarContainer>
        </SortableContext>

        {createPortal(
          <DragOverlay>
              {activeID ? renderDragOverlay(activeID): null}
          </DragOverlay>, document.body
        )}
      </DndContext>
    </SidebarCollapserContainer>
  );
};
