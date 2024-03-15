import { EditorState, StateEffect } from "@codemirror/state"
import { EditorView, keymap } from "@codemirror/view"
import { history, redo, undo, indentWithTab } from "@codemirror/commands"
import { indentUnit } from '@codemirror/language';

import { useRef, useState, useEffect, useMemo } from 'react'

import { useSyntaxHighlight } from "./useSyntaxHighlight"
import { useMarkdown } from "./useMarkdown"
import { useToggleBold, useToggleItalic } from "./useAction"
import { useImageAction } from "./useImageAction"

import { ImageProcessor } from "./ImageProcessor"
import { useEditorStyle } from "./useEditorStyle";
import { useEditing } from "./useEditing";

export type MarkdownEditorEventHandler = {
  editStart?: () => void;
  escape?: () => void;
  newPage?: () => void;
}

export type UseMarkdownEditorProps = {
  doc: string;
  setDoc: (doc: string) => void;

  imageProcessor?: ImageProcessor;
  eventHandler?: MarkdownEditorEventHandler
};

export const useMarkdownEditor = ({ doc, setDoc, eventHandler, imageProcessor }: UseMarkdownEditorProps) => {
  const editor = useRef(null); // EditorViewの親要素のref
  const [container, setContainer] = useState<HTMLDivElement>();
  const [view, setView] = useState<EditorView>();

  // ======== Extensions ========

  // Editorの状態が更新されたときの処理
  const updateListener = useMemo(() => {
    return EditorView.updateListener.of(update => {
      if (update.docChanged) {
        setDoc(update.state.doc.toString());
      }

      if (update.focusChanged && !update.view.hasFocus) {
        eventHandler?.editStart?.();
      }
    });
  }, [setDoc, eventHandler]);

  const imageActions = useImageAction(imageProcessor);
  const syntaxHighlight = useSyntaxHighlight();
  const markdownExtension = useMarkdown();
  const editorStyle = useEditorStyle();
  const keyHandler = useMemo(() => {
    return keymap.of([
      { 
        key: "Escape", 
        run: () => {
          eventHandler?.escape?.(); return true;
        } 
      }
    ])
  }, [eventHandler]);

  // Editorのextensionsをまとめる
  const extensions = useMemo(() => {
    return [
      history(), 
      keymap.of([indentWithTab]),
      indentUnit.of("    "),
      EditorView.lineWrapping,
      EditorState.tabSize.of(4),
      updateListener,
      markdownExtension, syntaxHighlight, imageActions, editorStyle, keyHandler
    ];
  },[updateListener, markdownExtension, syntaxHighlight, imageActions, editorStyle, keyHandler]);

  // extensionsを更新する
  useEffect(() => {
    if (!view) return
    view.dispatch({ effects: StateEffect.reconfigure.of(extensions) });
  }, [view, extensions]);

  // ======== Editor ========

  const setEditing = useEditing(view);

  const toggleBold = useToggleBold(view);
  const toggleItalic = useToggleItalic(view);

  const undoManager = {
    undo() { if (view) undo(view) },
    redo() { if (view) redo(view) }
  }
  // editorのrefをcontainerに設定する
  useEffect(() => { 
    if (editor.current) setContainer(editor.current); 
  }, [setContainer]);

  // viewを初期化する
  useEffect(() => {
    if (view || !container) return;

    const state = EditorState.create({ doc: doc, extensions: extensions });
    const viewCurrent = new EditorView({ state: state, parent: container });
    setView(viewCurrent);

  }, [view, container, doc, updateListener, extensions]);

  return { editor, toggleBold, toggleItalic, undoManager, setEditing };
};