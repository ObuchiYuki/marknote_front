export type MarkNoteCell = {
  type: "markdown" | "slide";
  id: number;
}

export type MarkdownCell = {
  type: "markdown";
  content: string;
} & MarkNoteCell;

export type SlideCell = {
  type: "slide";
  html: string;
  css: string;
} & MarkNoteCell;

export type MarkNoteDocument = {
  title: string;
  cells: MarkNoteCell[];

  selectedCellId: number | null;
}

export const mockInitialState: MarkNoteDocument = {
  title: "Untitled",
  cells: [],
  selectedCellId: null,
}
