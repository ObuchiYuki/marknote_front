import { MarkNodeCell, MarkNoteDocument } from "../model/MarkNoteDocument";
import { arrayMove } from "./util/arrayMove";
import { nanoid } from "./util/nanoid";

const crop = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value));
}

const minmax = (value1: number, value2: number) => {
  return [Math.min(value1, value2), Math.max(value1, value2)];
}

const makeCell = (id?: string) => {
  const cellID = id ?? nanoid();
  const cell: MarkNodeCell = {
    id: cellID,
    markdown: { content: "" },
    slide: { html: emptySlideHTML }
  }
  return cell;
}

const emptySlideHTML = `<div class="marpit"><section></section></div>`

export const cellReducer = {
  addCell(state: MarkNoteDocument, action: {}): MarkNoteDocument {
    const cell = makeCell()

    const inserIndex = state.selectionHead + 1;
    const nextCells = [...state.cells];
    nextCells.splice(inserIndex, 0, cell);

    return {
      ...state,
      selectionHead: inserIndex,
      selectionAnchor: inserIndex,
      editingCellIndex: inserIndex,
      cells: nextCells
    }
  },

  removeCell(state: MarkNoteDocument, action: {}): MarkNoteDocument {
    const [min, max] = [state.selectionHead, state.selectionAnchor].sort((a, b) => a - b);
    const removeCount = max - min + 1;

    if (removeCount === 0) { return state; }

    if (removeCount === state.cells.length) {
      // すべてのセルを削除する場合は、最後の1つのセルを残して、内容をクリアする
      const cell = makeCell(state.cells[state.cells.length - 1].id);
      return {
        ...state,
        cells: [cell]
      }
    }

    const nextCells = state.cells.filter((_, index) => {
      return !(min <= index && index <= max);
    });

    const nextSelectionHead = crop(min, 0, nextCells.length - 1);
    const nextEditingCellIndex = nextSelectionHead;

    return {
      ...state,
      selectionHead: nextSelectionHead,
      selectionAnchor: nextSelectionHead,
      editingCellIndex: nextEditingCellIndex,
      cells: nextCells
    }
  },

  selectCell(state: MarkNoteDocument, action: { index: number, allowsMultiple?: boolean }): MarkNoteDocument {    
    const allowsMultiple = action.allowsMultiple || false;

    state = {
      ...state,
      selectionHead: action.index
    }

    if (state.editingCellIndex != null) {
      state.editingCellIndex = action.index;
    }

    if (!allowsMultiple) {
      state.selectionAnchor = action.index;
    } else if (state.selectionAnchor !== state.selectionHead) {
      state.editingCellIndex = undefined;
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
    const nextCursor = crop(currentCursor + action.direction, 0, state.cells.length - 1);

    return cellReducer.selectCell(state, { index: nextCursor, allowsMultiple: action.allowsMultiple });
  },

  moveUp(state: MarkNoteDocument, action: {}): MarkNoteDocument {
    const [min, ] = minmax(state.selectionHead, state.selectionAnchor);
    if (min === 0) { return state; }
    return cellReducer._moveCell(state, { targetIndex: min - 1 });
  },

  moveDown(state: MarkNoteDocument, action: {}): MarkNoteDocument {
    const [, max] = minmax(state.selectionHead, state.selectionAnchor);
    if (max === state.cells.length - 1) { return state; }
    return cellReducer._moveCell(state, { targetIndex: max + 1 });
  },

  _moveCell(state: MarkNoteDocument, action: { targetIndex: number }): MarkNoteDocument {
    if (state.cells.length <= 1) { return state; }
    
    const [min, max] = minmax(state.selectionHead, state.selectionAnchor);
    const headCellID = state.cells[min].id;
    const anchorCellID = state.cells[max].id;
    const editingCellID = state.editingCellIndex != null ? state.cells[state.editingCellIndex].id : undefined;

    const nextCells = arrayMove(state.cells, { from: min, to: max+1 }, action.targetIndex);
    const nextHead = nextCells.findIndex(cell => cell.id === headCellID) ?? 0;
    const nextAnchor = nextCells.findIndex(cell => cell.id === anchorCellID) ?? 0;
    const nextEditingCellIndex = editingCellID != null ? nextCells.findIndex(cell => cell.id === editingCellID) : undefined;

    return {
      ...state,
      cells: nextCells,
      selectionHead: nextHead,
      selectionAnchor: nextAnchor,
      editingCellIndex: nextEditingCellIndex
    }
  },

  editCell(state: MarkNoteDocument, action: { index?: number }): MarkNoteDocument {
    const index = action.index || state.selectionHead;
    return {
      ...state,
      selectionHead: index,
      selectionAnchor: index,
      editingCellIndex: index,
    }
  },

  escapeCell(state: MarkNoteDocument, action: {}): MarkNoteDocument {
    return {
      ...state,
      editingCellIndex: undefined,
    }
  }
}
