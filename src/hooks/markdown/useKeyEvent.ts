import { useMemo } from "react";
import { EditorView, keymap } from "@codemirror/view";

export type UseKeyEventProps = {
  escape?: () => void,
  topEdgeMove?: () => void,
  bottomEdgeMove?: () => void,
}

const edgeMoveHandler = (direction: "up"|"down", props?: UseKeyEventProps) => {
  return (view: EditorView) => {
      const { state } = view;
      const selection = state.selection.main;
      const topLine = state.doc.lineAt(selection.from).number;
      const bottomLine = state.doc.lines;

      if (direction === 'up' && topLine === 1) {
          props?.topEdgeMove?.();
          return true; 
      } else if (direction === 'down' && topLine === bottomLine) {
          props?.bottomEdgeMove?.();
          return true;
      }

      return false;
  };
}

export const useKeyEvent = (props?: UseKeyEventProps) => {
  return useMemo(() => {
    return keymap.of([
      { 
        key: "Escape", 
        run: () => { props?.escape?.(); return true; } 
      },
      {
        key: "ArrowUp",
        run: edgeMoveHandler("up", props)
      },
      {
        key: "ArrowDown",
        run: edgeMoveHandler("down", props)
      },
      {
        key: "Shift-Enter",
        run: (view: EditorView) => {
          console.log("Shift-Enter pressed!")
          return true;
        }
      }
    ])
  }, [props]);
}