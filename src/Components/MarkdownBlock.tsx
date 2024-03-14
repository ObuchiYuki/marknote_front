import styled from 'styled-components'

import { useMarkdownEditor } from '../hooks/markdown/useMarkdownEditor';

const MarkdownCellBackground = styled.div`
  background-color: #F8F8F8;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  padding: 4px;
  width: 100%;
`

export const MarkdownBlock = (
  { code, setCode }: { code: string, setCode: (code: string) => void }
) => {
  const { editor } = useMarkdownEditor({
    doc: code,
    setDoc: setCode,
    imageProcessor: {
      process: async (file: File) => {
        return {
          url: URL.createObjectURL(file),
          alt: file.name,
        };
      }
    }
  });

  return (
    <MarkdownCellBackground>
      <div ref={editor} />
    </MarkdownCellBackground>
  );
}
  
  