import styled from 'styled-components'

import { useMarkdownEditor } from '../hooks/markdown/useMarkdownEditor';
import { MarkdownContent } from '../model/MarkNoteDocument';
import { useAppDispatch } from '../hooks/useRedux';

const AreaBackground = styled.div<{ $editing: boolean }>`
  background-color: #F8F8F8;
  border-radius: 6px;
  padding: 4px;
  width: 100%;
  border: ${props => props.$editing ? "2px solid #67A4E9" : "1px solid rgba(0, 0, 0, 0.15)"};
`

export type MarkdownAreaProps = {
  cell: MarkdownContent,
  index: number,
  editing: boolean,
}

export const MarkdownArea = ({ cell, index, editing }: MarkdownAreaProps) => {
  const dispatch = useAppDispatch();

  const updateMarkdown = (content: string) => {
    dispatch({ type: "updateMarkdown", content: content, index: index })
  }

  const editMarkdown = () => {
    dispatch({ type: "editCell" });
  }

  const { editor, setEditing } = useMarkdownEditor({ 
    doc: cell.content, 
    setDoc: updateMarkdown, 
    eventHandler: { 
      editStart: editMarkdown,
      escape: () => {
        console.log("escape");
      }
    }
  });

  setEditing(editing);

  return (
    <AreaBackground $editing={editing}>
      <div ref={editor} />
    </AreaBackground>
  );
}
