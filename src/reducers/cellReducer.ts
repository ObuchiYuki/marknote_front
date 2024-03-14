import { MarkNodeCellGroup, MarkNoteDocument } from "../model/MarkNoteDocument";

const initialHTML = `
<div class="slide"></div>
`

const initialCSS = `
.slide {
  background-color: white;
}
`

export const cellReducer = {
  addMarkdownCell(state: MarkNoteDocument, action: {}): MarkNoteDocument {
    const groupID = state.groups.length;
    const group: MarkNodeCellGroup = {
      id: groupID,
      markdown: { content: "" },
      slide: { html: initialHTML, css: initialCSS }
    }

    return {
      ...state,
      groups: [...state.groups, group],
    }
  },

  unselectCell(state: MarkNoteDocument, action: { ids: number | number[] }): MarkNoteDocument {
    const ids = new Set(Array.isArray(action.ids) ? action.ids : [action.ids]);
    const newSelectedGroups = []

    for (const id of state.selectedGroups) {
      if (!ids.has(id)) {
        newSelectedGroups.push(id);
      }
    }
    
    return {
      ...state,
      selectedGroups: newSelectedGroups,
    }
  },

  unselectAllCell(state: MarkNoteDocument, action: {}): MarkNoteDocument {
    return {
      ...state,
      selectedGroups: [],
    }
  },

  selectCell(state: MarkNoteDocument, action: { id: number, allowsMultipleSelection?: boolean }): MarkNoteDocument {
    const allowsMultipleSelection = action.allowsMultipleSelection || false;
    
    if (allowsMultipleSelection) {
      return {
        ...state,
        selectedGroups: [...state.selectedGroups, action.id],
      }
    } else {
      return {
        ...state,
        selectedGroups: [action.id],
      }
    }
  }


}