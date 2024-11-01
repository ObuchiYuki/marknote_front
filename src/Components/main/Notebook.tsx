import styled from "styled-components";
import { NotebookCell } from "./NotebookCell";
import { useAppSelector } from "../../hooks/useRedux";
import React, { useRef } from "react";

const NodebookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: auto;
`;

const NodebookListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  max-width: 850px;
  border-radius: 5px;
`;

export const Notebook = ({ style }: { style: React.CSSProperties }) => {
  const doc = useAppSelector(state => state.present.doc);
  const ui = useAppSelector(state => state.present.ui);
  const headCellRef = useRef<HTMLDivElement>(null);
  const [cursorMin, cursorMax] = [ui.selectionAnchor, ui.selectionHead].sort((a, b) => a - b);

  // useEffect(() => {
  //   if (!headCellRef.current) return;
    
  //   const cellRect = headCellRef.current.getBoundingClientRect();
  //   const viewportTop = 0;
  //   const viewportBottom = window.innerHeight;
  //   const margin = 20; // ここでマージンを設定

  //   if (cellRect.top - margin < viewportTop) {
  //     // セルの上部がビューポートの上に隠れている場合、マージンを考慮してスクロール
  //     window.scrollTo({
  //       top: window.pageYOffset + cellRect.top - margin,
  //       behavior: 'smooth'
  //     });
  //   } else if (cellRect.bottom + margin > viewportBottom) {
  //     // セルの下部がビューポートの下に隠れている場合、マージンを考慮してスクロール
  //     window.scrollTo({
  //       top: window.pageYOffset + cellRect.bottom - viewportBottom + margin,
  //       behavior: 'smooth'
  //     });
  //   }
    
  // }, [ui.selectionHead]);

  return (
    <NodebookContainer style={style}>
      <NodebookListContainer>
        {
          doc.cells.map((cell, index) => {
            const head = ui.selectionHead === index;
            const selected = cursorMin <= index && index <= cursorMax;
            const multipleSelected = Math.abs(ui.selectionAnchor - ui.selectionHead) > 0 && selected;
            const aboveSelected = cursorMin < index;
            const belowSelected = cursorMax > index;
            const editing = ui.editingCell === index

            return <NotebookCell 
              ref={head ? headCellRef : null}
              key={cell.id} 
              index={index}
              cell={cell} 
              isMultipleSelected={multipleSelected} 
              isAboveSelected={aboveSelected}
              isBelowSelected={belowSelected}
              isEditing={editing} 
              isHead={head} 
            />;
          })
        }
      </NodebookListContainer>
    </NodebookContainer>
  )
}