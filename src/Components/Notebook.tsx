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
  const [cursorMin, cursorMax] = [doc.cursorAnchor, doc.cursorHead].sort((a, b) => a - b);

  return (
    <NodebookContainer>
      <NodebookListContainer>
        {
          doc.groups.map((group, index) => {
            const focused = doc.cursorHead === index;
            const selected = cursorMin <= index && index <= cursorMax;
            const multipleSelected = Math.abs(doc.cursorAnchor - doc.cursorHead) > 0 && selected;
            const editing = doc.editingGroup === group.id;

            return <NotebookCell 
              key={group.id} 
              group={group} 
              multipleSelected={multipleSelected} 
              editing={editing} 
              focused={focused} 
            />;
          })
        }
      </NodebookListContainer>
    </NodebookContainer>
  )
}