export type MarkNoteCell = {
  id: string;
  content: string;
}

export type MarkNoteDocument = {
  title: string;
  cells: MarkNoteCell[];

  selectedCellId: string | null;
}