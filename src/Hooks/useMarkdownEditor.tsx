import { EditorState } from "@codemirror/state"
import { EditorView, ViewUpdate } from "@codemirror/view"
import { useRef, useState, useEffect, useMemo } from 'react'

export type UseMarkdownEditorProps = {
  doc: string;
  setDoc: (doc: string) => void;
};

export const useMarkdownEditor = ({doc, setDoc }: UseMarkdownEditorProps) => {
  const editor = useRef(null); // EditorViewの親要素のref
  const [container, setContainer] = useState<HTMLDivElement>();
  const [view, setView] = useState<EditorView>();

  // editorのrefをcontainerに設定する
  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [setContainer]);

  // Editorの状態が更新されたときの処理
  const updateListener = useMemo(() => {
    return EditorView.updateListener.of((update: ViewUpdate) => {
      if (update.docChanged) {
        // エディタのテキストが更新されるたびにdocを更新する
        setDoc(update.state.doc.toString());
      }
    });
  }, [setDoc]);

  // viewを初期化する
  useEffect(() => {
    if (!view && container) {
      const state = EditorState.create({
        doc, // エディタの初期値としてdocを設定する
        extensions: [updateListener],
      });
      const viewCurrent = new EditorView({
        state,
        parent: container,
      });
      setView(viewCurrent);
    }
  }, [view, container, doc, updateListener]);

  return {
    editor
  };
};