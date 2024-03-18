import { makeCell } from "../util/makeCell";

export type MarkdownContent = {
  content: string;
}

export type SlideContent = {
  html: string;
  css: string;
}

export type MarkNodeCell = {
  // 内部管理用のID (nanoid)。起動時/Cellの作成時にランダムな文字列を生成する
  id: string;
  markdown: MarkdownContent;
  slide: SlideContent;
}

export type MarkNoteDocument = {
  cells: MarkNodeCell[];
}

export const initialState: MarkNoteDocument = {
  cells: [
    makeCell({ markdown: "# Hello World 1" }),
    makeCell({ markdown: "# Hello World 2" }),
    makeCell({ markdown: "# Hello World 3" }),
  ]
}
