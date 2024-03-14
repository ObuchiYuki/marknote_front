import styled from "styled-components";
import { MarkdownBlock } from "./MarkdownBlock";
import { SlideBlock } from './SlideBlock';
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { MarkNodeCellGroup, MarkdownCell, SlideCell } from "../model/MarkNoteDocument";

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

const MarkdownBlockCell = ({ cell, id }: { cell: MarkdownCell, id: number }) => {
  const dispatch = useAppDispatch();

  return (
    <MarkdownBlock
      code={cell.content}
      setCode={content => { dispatch({ type: "updateMarkdown", content: content, id: id }) }}
    />
  );
}

const SlideBlockCell = ({ cell }: { cell: SlideCell }) => {
  return (
    <SlideBlock
      slide={{ html: cell.html, css: cell.css }}
    />
  );
}

const BlockCellGroup = ({ group }: { group: MarkNodeCellGroup }) => {
  return (
    <>
      <MarkdownBlockCell cell={group.markdown} id={group.id} />
      <SlideBlockCell cell={group.slide} />
    </>
  );
}

export const Notebook = () => {
  const doc = useAppSelector(state => state);

  return (
    <NodebookContainer>
      <NodebookListContainer>

        {
          doc.groups.map(group => (
            <BlockCellGroup key={group.id} group={group} />
          ))
        }
      </NodebookListContainer>
    </NodebookContainer>
  )
}