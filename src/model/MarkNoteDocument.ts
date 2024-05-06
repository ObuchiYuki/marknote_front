import { makeCell } from "../util/makeCell";

export type MarkdownContent = {
  content: string;
}

export type SlideContent = {
  html: string;
  css: string;
  size: { width: number, height: number };
}

export type MarkNoteCell = {
  // 内部管理用のID (nanoid)。起動時/Cellの作成時にランダムな文字列を生成する
  id: string;
  page: number;
  markdown: MarkdownContent;
  slide: SlideContent;
}

export type MarkNoteDocument = {
  cells: MarkNoteCell[];
}

export const initialState: MarkNoteDocument = {
  cells: [
    makeCell({ markdown: "# Hello World 2", page: 1 }),
    makeCell({ markdown: "# Hello World 3", page: 2 }),
    makeCell({ markdown: "# Hello World 1", page: 3 }),
    makeCell({ markdown: "# Hello World 2", page: 4 }),
    makeCell({ markdown: "# Hello World 3", page: 5 }),
    makeCell({ markdown: "# Hello World 1", page: 6 }),
    makeCell({ markdown: "# Hello World 2", page: 7 }),
    makeCell({ markdown: "# Hello World 3", page: 8 }),
    makeCell({ markdown: "# Hello World 1", page: 9 }),
    makeCell({ markdown: "# Hello World 2", page: 11 }),
    makeCell({ markdown: "# Hello World 3", page: 12 }),
    makeCell({ markdown: "# Hello World 1", page: 13 }),
    makeCell({ markdown: "# Hello World 2", page: 14 }),
    makeCell({ markdown: "# Hello World 3", page: 15 }),
    makeCell({ markdown: "# Hello World 1", page: 16 }),
    makeCell({ markdown: "# Hello World 2", page: 17 }),
    makeCell({ markdown: "# Hello World 3", page: 18 }),
  ]
}
