import styled from 'styled-components'

import { useMarkdownEditor } from '../hooks/markdown/useMarkdownEditor';
import { MarkdownContent } from '../model/MarkNoteDocument';
import { editCell, escapeCell, selectDown, selectUp } from '../redux/thunk/cellAction';
import { updateMarkdown } from '../redux/thunk/markdownAction';

const AreaBackground = styled.div<{ $editing: boolean }>`
  background-color: #F8F8F8;
  border-radius: 6px;
  padding: 4px;
  width: 100%;
  box-sizing: border-box;
  border: ${props => props.$editing ? "1px solid #67A4E9" : "1px solid rgba(0, 0, 0, 0.15)"};
`

export type MarkdownAreaProps = {
  cell: MarkdownContent,
  index: number,
  editing: boolean,
}

export const MarkdownArea = ({ cell, index, editing }: MarkdownAreaProps) => {
  const { editor, setEditing } = useMarkdownEditor({ 
    doc: cell.content, 
    setDoc: content => updateMarkdown({ content: content, index: index }),
    eventHandler: { 
      editStart: () => { editCell({ index: index }) },
      escape: () => {
        escapeCell();
        setEditing(false);
      },
      topEdgeMove: selectUp,
      bottomEdgeMove: selectDown
    }
  });

  setEditing(editing);

  return (
    <AreaBackground $editing={editing}>
      <div ref={editor} />
    </AreaBackground>
  );
}
