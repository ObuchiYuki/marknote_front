import { MarkNodeCell, MarkNoteDocument } from "../model/MarkNoteDocument";
import { nanoid } from "./util/nanoid";

export const cellReducer = {
  addCell(state: MarkNoteDocument, action: {}): MarkNoteDocument {
    const groupID = nanoid();
    const group: MarkNodeCell = {
      id: groupID,
      markdown: { content: "" },
      slide: { html: "" }
    }

    const inserIndex = state.selectionHead + 1;
    const nextCells = [...state.cells];
    nextCells.splice(inserIndex, 0, group);

    return {
      ...state,
      selectionHead: inserIndex,
      selectionAnchor: inserIndex,
      editingCellIndex: inserIndex,
      cells: nextCells
    }
  },

  selectCell(state: MarkNoteDocument, action: { index: number, allowsMultiple?: boolean }): MarkNoteDocument {    
    const allowsMultiple = action.allowsMultiple || false;

    state = {
      ...state,
      selectionHead: action.index,
      editingCellIndex: undefined,
    }

    if (!allowsMultiple) {
      state.selectionAnchor = action.index;
    }

    return state
  },

  selectUp(state: MarkNoteDocument, action: { allowsMultiple?: boolean }): MarkNoteDocument {
    return cellReducer._selectArrow(state, { allowsMultiple: action.allowsMultiple, direction: -1 });
  },

  selectDown(state: MarkNoteDocument, action: { allowsMultiple?: boolean }): MarkNoteDocument {
    return cellReducer._selectArrow(state, { allowsMultiple: action.allowsMultiple, direction: 1 });
  },

  _selectArrow(state: MarkNoteDocument, action: { allowsMultiple?: boolean, direction: number }): MarkNoteDocument {
    const currentCursor = state.selectionHead;
    const nextCursor = Math.max(0, Math.min(currentCursor + action.direction, state.cells.length - 1));

    return cellReducer.selectCell(state, { index: nextCursor, allowsMultiple: action.allowsMultiple });
  },

  editCell(state: MarkNoteDocument, action: { index?: number }): MarkNoteDocument {
    const index = action.index || state.selectionHead;
    return {
      ...state,
      selectionHead: index,
      editingCellIndex: index,
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
