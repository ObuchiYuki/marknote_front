import styled from "styled-components";
import { MarkdownBlock } from "./MarkdownBlock";
import { SlideBlock } from './SlideBlock';
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { MarkNodeCellGroup, MarkdownCell, SlideCell } from "../model/MarkNoteDocument";
import { ImageUnit } from "../hooks/markdown/ImageProcessor";

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

const mockImageProcessor = (file: File) => {
  return new Promise<ImageUnit>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        url: "https://via.placeholder.com/150",
        alt: "placeholder"
      });
    }, 1000);
  });
}

const MarkdownBlockCell = ({ cell, id }: { cell: MarkdownCell, id: number }) => {
  const dispatch = useAppDispatch();

  return (
    <MarkdownBlock
      doc={cell.content}
      setDoc={content => { dispatch({ type: "updateMarkdown", content: content, id: id }) }}
      setFocus={focus => { dispatch({ type: "onCellForcus", id: id, focus: focus }) }}
      imageProcessor={mockImageProcessor}
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

const BlockCellGroupBackground = styled.div<{ focused: boolean }>`
  display: flex;
  gap: 20px;
  flex-direction: column;
  padding: 12px;
  border-radius: 6px;
  border-left: 5px solid ${props => props.focused ? "#67A4E9" : "transparent"};
`;

const BlockCellGroup = ({ group, focusedId }: { group: MarkNodeCellGroup, focusedId: number | null }) => {
  const dispatch = useAppDispatch();
  const focused = focusedId === group.id 

  return (
    <BlockCellGroupBackground focused={focused} onClick={() => dispatch({ type: "onCellForcus", id: group.id, focus: true })}>
      <MarkdownBlockCell cell={group.markdown} id={group.id} />
      <SlideBlockCell cell={group.slide} />
    </BlockCellGroupBackground>
  );
}

export const Notebook = () => {
  const doc = useAppSelector(state => state);

  return (
    <NodebookContainer>
      <NodebookListContainer>

        {
          doc.groups.map(group => (
            <BlockCellGroup key={group.id} group={group} focusedId={doc.selectedCellId} />
          ))
        }
      </NodebookListContainer>
    </NodebookContainer>
  )
}