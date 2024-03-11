import { useMemo } from 'react';
import { EditorView } from '@codemirror/view';

export const useEditorStyle = () => {
  return useMemo(() => {
    return EditorView.theme({
      // editorの外枠
      '&.cm-editor': {
        outline: 'none', // エディターの枠線を非表示
      }
    });
  }, []);
}