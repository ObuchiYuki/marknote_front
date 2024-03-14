import { MarkNodeCellGroup, MarkNoteDocument, MarkdownCell, SlideCell } from "../model/MarkNoteDocument";

export const cellReducer = {
  addMarkdownCell(state: MarkNoteDocument, action: {}): MarkNoteDocument {
    const groupID = state.groups.length;
    const group: MarkNodeCellGroup = {
      id: groupID,
      markdown: { content: "" },
      slide: { html: "", css: "" }
    }

    return {
      ...state,
      groups: [...state.groups, group],
    }
  }
}