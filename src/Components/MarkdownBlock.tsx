import styled from 'styled-components'

import { useMarkdownEditor, UseMarkdownEditorProps } from '../hooks/markdown/useMarkdownEditor';

const MarkdownCellBackground = styled.div`
  background-color: #F8F8F8;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  padding: 4px;
  width: 100%;
`

export const MarkdownBlock = (
  props: UseMarkdownEditorProps
) => {
  const { editor } = useMarkdownEditor(props);

  return (
    <MarkdownCellBackground>
      <div ref={editor} />
    </MarkdownCellBackground>
  );
}
  
  