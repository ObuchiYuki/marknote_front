import { EditorView } from "@codemirror/view"
import { useCallback } from 'react'

export const useToggleBold = (view: EditorView | undefined): () => void => {
  return useCallback(() => {
    if (!view) return;
    const range = view.state.selection.main;
    if (
      view.state.sliceDoc(range.from, range.from + 2) === '**' &&
      view.state.sliceDoc(range.to - 2, range.to) === '**'
    ) {
      const transaction = view.state.update({
        changes: {
          from: range.from,
          to: range.to,
          insert: view.state.sliceDoc(range.from + 2, range.to - 2),
        },
      });
      view.dispatch(transaction);
    } else {
      const transaction = view.state.update({
        changes: {
          from: range.from,
          to: range.to,
          insert: `**${view.state.sliceDoc(range.from, range.to)}**`,
        },
      });
      view.dispatch(transaction);
    }
    return true;
  }, [view]);
};

export const useToggleItalic = (view: EditorView | undefined): () => void => {
  return useCallback(() => {
    if (!view) return;
    const range = view.state.selection.main;
    if (
      view.state.sliceDoc(range.from, range.from + 1) === '*' &&
      view.state.sliceDoc(range.to - 1, range.to) === '*'
    ) {
      const transaction = view.state.update({
        changes: {
          from: range.from,
          to: range.to,
          insert: view.state.sliceDoc(range.from + 1, range.to - 1),
        },
      });
      view.dispatch(transaction);
    } else {
      const transaction = view.state.update({
        changes: {
          from: range.from,
          to: range.to,
          insert: `*${view.state.sliceDoc(range.from, range.to)}*`,
        },
      });
      view.dispatch(transaction);
    }
    return true;
  }, [view]);
}

export const useMakeHeader = (view: EditorView | undefined, level: number) => {
  if (!view) return;

  // markdownの解析が必要なため、一度無視する

  return true;
}