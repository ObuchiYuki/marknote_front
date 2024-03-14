export type MarkdownCell = {
  content: string;
}

export type SlideCell = {
  html: string;
  css: string;
}

export type MarkNoteCell = MarkdownCell | SlideCell;

export type MarkNodeCellGroup = {
  // 内部管理用のID (nanoid)。起動時/Cellの作成時にランダムな文字列を生成する
  
  id: number;
  markdown: MarkdownCell;
  slide: SlideCell;
}

export type MarkNoteDocument = {
  title: string;
  groups: MarkNodeCellGroup[];

  // 選択範囲は min(cursorAnchor, cursorHead)..<max(cursorAnchor, cursorHead)
  cursorAnchor: number; // 選択のアンカー (index)
  cursorHead: number; // 編集中のセル | 選択の先頭 (index)
  editingGroup?: number; // (index)
}

export const mockInitialState: MarkNoteDocument = {
  title: "Untitled",
  groups: [
    {
      id: 0,
      markdown: { content: "# Hello World" },
      slide: { html: "", css: "" }
    },
    {
      id: 1,
      markdown: { content: "# Hello World2" },
      slide: { html: "", css: "" }
    }
  ],
  cursorAnchor: 0,
  cursorHead: 0
}
