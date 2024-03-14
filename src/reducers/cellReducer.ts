import { MarkNodeCellGroup, MarkNoteDocument } from "../model/MarkNoteDocument";

const initialHTML = `
`

const initialCSS = `
.slide {
  width: 200%;
  height: 200%;
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
      editingGroup: groupID,
      groups: [...state.groups, group],
    }
  },

  selectCell(state: MarkNoteDocument, action: { id: number, allowsMultiple?: boolean }): MarkNoteDocument {    
    const allowsMultiple = action.allowsMultiple || false;

    state = {
      ...state,
      cursorHead: action.id,
      editingGroup: undefined,
    }

    if (!allowsMultiple) {
      state.cursorAnchor = action.id;
    }

    console.log(state);


    return state
  },

  selectUp(state: MarkNoteDocument, action: { allowsMultiple?: boolean }): MarkNoteDocument {
    const currentCursor = state.cursorAnchor
    const nextCursor = Math.max(0, Math.min(currentCursor - 1, state.groups.length - 1));

    return cellReducer.selectCell(state, { id: nextCursor, allowsMultiple: action.allowsMultiple });
  },

  selectDown(state: MarkNoteDocument, action: { allowsMultiple?: boolean }): MarkNoteDocument {
    const currentCursor = state.cursorAnchor
    const nextCursor = Math.max(0, Math.min(currentCursor + 1, state.groups.length - 1));

    return cellReducer.selectCell(state, { id: nextCursor, allowsMultiple: action.allowsMultiple });
  },

  editMarkdown(state: MarkNoteDocument, action: {}): MarkNoteDocument {
    return {
      ...state,
      editingGroup: state.cursorHead,
    }
  }
}


  // unselectCell(state: MarkNoteDocument, action: { ids: number | number[] }): MarkNoteDocument {
  //   const ids = new Set(Array.isArray(action.ids) ? action.ids : [action.ids]);
  //   const newSelectedGroups = []

  //   for (const id of state.selectedGroups) {
  //     if (!ids.has(id)) {
  //       newSelectedGroups.push(id);
  //     }
  //   }
    
  //   return {
  //     ...state,
  //     selectedGroups: newSelectedGroups,
  //   }
  // },
