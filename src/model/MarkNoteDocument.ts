export type MarkdownCell = {
  content: string;
}

export type SlideCell = {
  html: string;
  css: string;
}

export type MarkNoteCell = MarkdownCell | SlideCell;

export type MarkNodeCellGroup = {
  id: number;
  markdown: MarkdownCell;
  slide: SlideCell;
}

export type MarkNoteDocument = {
  title: string;
  groups: MarkNodeCellGroup[];
  selectedCellId: number | null;
}

export const mockInitialState: MarkNoteDocument = {
  title: "Untitled",
  groups: [],
  selectedCellId: null,
}
