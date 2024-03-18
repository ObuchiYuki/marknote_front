import styled from "styled-components";
import { NotebookCell } from "./NotebookCell";
import { useAppSelector } from "../hooks/useRedux";

const NodebookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export const Notebook = () => {
  const doc = useAppSelector(state => state.doc);
  const ui = useAppSelector(state => state.ui);
  const [cursorMin, cursorMax] = [ui.selectionAnchor, ui.selectionHead].sort((a, b) => a - b);

  return (
    <NodebookContainer>
      <NodebookListContainer>
        {
          doc.cells.map((cell, index) => {
            const head = ui.selectionHead === index;
            const selected = cursorMin <= index && index <= cursorMax;
            const multipleSelected = Math.abs(ui.selectionAnchor - ui.selectionHead) > 0 && selected;
            const editing = ui.editingCell === index

            return <NotebookCell 
              key={cell.id} 
              index={index}
              cell={cell} 
              multipleSelected={multipleSelected} 
              editing={editing} 
              head={head} 
            />;
          })
        }
      </NodebookListContainer>
    </NodebookContainer>
  )
}