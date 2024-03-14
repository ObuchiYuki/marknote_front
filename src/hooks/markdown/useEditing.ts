import { EditorView } from "@codemirror/view"
import { useCallback } from 'react'

export const useEditing = (view: EditorView | undefined) => {
  return useCallback((editing: boolean) => {
    if (!view) return;

    if (editing) {
      if (!view.hasFocus) view.focus();
    } else {
      if (view.hasFocus) view.contentDOM.blur();
    }
  }, [view]);
}
  