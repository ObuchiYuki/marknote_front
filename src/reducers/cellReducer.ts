import { MarkNodeCellGroup, MarkNoteDocument } from "../model/MarkNoteDocument";

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
  },

  onCellForcus(state: MarkNoteDocument, action: { id: number, focus: boolean }): MarkNoteDocument {
    console.log("onCellForcus", action);

    if (action.focus) {
      return {
        ...state,
        selectedCellId: action.id,
      }
    }

    return state;
  }
}