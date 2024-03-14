import styled from 'styled-components'

import { useMarkdownEditor } from '../hooks/markdown/useMarkdownEditor';
import { MarkdownCell } from '../model/MarkNoteDocument';
import { useAppDispatch } from '../hooks/useRedux';

const AreaBackground = styled.div`
  background-color: #F8F8F8;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  padding: 4px;
  width: 100%;
`

export type MarkdownAreaProps = {
  cell: MarkdownCell,
  id: number,
  editing: boolean,
}

export const MarkdownArea = ({ cell, id, editing }: MarkdownAreaProps) => {
  const dispatch = useAppDispatch();

  const updateMarkdown = (content: string) => {
    dispatch({ type: "updateMarkdown", content: content, id: id })
  }

  const editMarkdown = () => {
    dispatch({ type: "editMarkdown", id: id });
  }

  const { editor, setEditing } = useMarkdownEditor({ 
    doc: cell.content, 
    setDoc: updateMarkdown, 
    onEditStart: editMarkdown,
  });

  setEditing(editing);

  return (
    <AreaBackground>
      <div ref={editor} />
    </AreaBackground>
  );
}
