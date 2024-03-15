import { nanoid } from "../reducers/util/nanoid";

export type MarkdownContent = {
  content: string;
}

export type SlideContent = {
  html: string;
}

export type MarkNodeCell = {
  // 内部管理用のID (nanoid)。起動時/Cellの作成時にランダムな文字列を生成する
  id: string;
  markdown: MarkdownContent;
  slide: SlideContent;
}

export type MarkNoteDocument = {
  title: string;
  cells: MarkNodeCell[];

  selectionAnchor: number; // 選択のアンカー (index)
  selectionHead: number; // 編集中のセル | 選択の先頭 (index)

  editingCellIndex?: number; // (index)
}

export const mockInitialState: MarkNoteDocument = {
  title: "Untitled",
  cells: [
    {
      id: nanoid(),
      markdown: { content: "# Hello World" },
      slide: { html: "" }
    },
    {
      id: nanoid(),
      markdown: { content: "# Hello World2" },
      slide: { html: "" }
    }
  ],
  selectionAnchor: 0,
  selectionHead: 0
}
