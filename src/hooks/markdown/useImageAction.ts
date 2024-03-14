import { EditorView } from "@codemirror/view"
import { useMemo } from 'react'

import { ImageProcessor, ImageUnit } from "./ImageProcessor"

const insertText = (unit: ImageUnit, pos: number, view: EditorView): void => {
  const insertText = `![${unit.alt ?? ""}](${unit.url})`;
  const transaction = view.state.update({
    changes: {
      from: pos,
      insert: insertText,
    },
  });
  view.dispatch(transaction);
}

const onDrop = (event: DragEvent, view: EditorView, imageProcessor: ImageProcessor) => {
  if (!event.dataTransfer) return;

  const cursorPos = view.posAtCoords({
    x: event.pageX,
    y: event.pageY,
  }) ?? 0;

  if (event.dataTransfer.items) {
    for (let i = 0; i < event.dataTransfer.items.length; i++) {
      const item = event.dataTransfer.items[i];
      // ドロップしたものがファイルでない場合は拒否する
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (!file) return;

        imageProcessor(file).then((unit) => {
          insertText(unit, cursorPos, view);
        });
      }
    }
  } else {
    // DataTransfer インターフェイスを使用してファイルにアクセスする
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      const file = event.dataTransfer.files[i];

      imageProcessor(file).then((unit) => {
        insertText(unit, cursorPos, view);
      });
    }
  }
}

const onPaste = (event: ClipboardEvent, view: EditorView, imageProcessor: ImageProcessor) => {
  if (!event.clipboardData?.files?.length) return;

  for (let i = 0; i < event.clipboardData.files.length; i++) {
    const file = event.clipboardData.files[i];

    imageProcessor(file).then((unit): void => {
      insertText(unit, view.state.selection.main.head, view);
    });
  }
}

export const useImageAction = (imageProcessor: ImageProcessor) => {
  return useMemo(() => EditorView.domEventHandlers({
    drop(event, view) { onDrop(event, view, imageProcessor); },
    paste(event, view) { onPaste(event, view, imageProcessor); },
  }), [imageProcessor]);
}
