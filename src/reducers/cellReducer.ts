import { MarkNoteDocument, MarkdownCell } from "../model/MarkNoteDocument";

export const cellReducer = {
  addMarkdownCell(state: MarkNoteDocument, action: {}): MarkNoteDocument {
    const cellID = state.cells.length;
    const markdownCell: MarkdownCell = {
      type: "markdown",
      id: cellID,
      content: "",
    }

    return {
      ...state,
      cells: [...state.cells, markdownCell],
    }
  }
}