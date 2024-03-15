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
  const doc = useAppSelector(state => state);
  const [cursorMin, cursorMax] = [doc.selectionAnchor, doc.selectionHead].sort((a, b) => a - b);

  return (
    <NodebookContainer>
      <NodebookListContainer>
        {
          doc.cells.map((cell, index) => {
            const head = doc.selectionHead === index;
            const selected = cursorMin <= index && index <= cursorMax;
            const multipleSelected = Math.abs(doc.selectionAnchor - doc.selectionHead) > 0 && selected;
            const editing = doc.editingCellIndex === index

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