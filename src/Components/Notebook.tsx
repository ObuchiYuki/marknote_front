import styled from "styled-components";
import { BlockCellGroup } from "./BlockCellGroup";
import { useAppSelector } from "../hooks/useRedux";

const NodebookContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NodebookListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  max-width: 850px;
`;

export const Notebook = () => {
  const doc = useAppSelector(state => state);

  return (
    <NodebookContainer>
      <NodebookListContainer>

        {
          doc.groups.map(group => {
            return <BlockCellGroup key={group.id} group={group} focused={false} />;
          })
        }
      </NodebookListContainer>
    </NodebookContainer>
  )
}