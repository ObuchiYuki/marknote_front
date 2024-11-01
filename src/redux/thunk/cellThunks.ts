import { setCells } from "../documentSlice";
import { AppThunk } from "../store/store";
import { setEditing, setUIState } from "../uiSlice";
import { arrayMove } from "../../util/arrayMove";
import { makeCell } from "../../util/makeCell";
import { crop, minmax } from "../../util/math";

export const addCell = (): AppThunk => (dispatch, getState) => {
  const { present: { doc, ui } } = getState();

  const inserIndex = ui.selectionHead + 1;
  const nextCells = [...doc.cells];
  const cell = makeCell({ markdown: "", page: inserIndex+1 });
  nextCells.splice(inserIndex, 0, cell);

  dispatch(setUIState({
    head: inserIndex,
    anchor: inserIndex,
    editing: inserIndex
  }));

  dispatch(setCells(nextCells));
};

export const removeCell = (): AppThunk => (dispatch, getState) => {
  const { present: { doc, ui } } = getState();

  const [min, max] = minmax(ui.selectionHead, ui.selectionAnchor);
  const removeCount = max - min + 1;

  if (removeCount === 0) return;

  if (removeCount === doc.cells.length) {
    // すべてのセルを削除する場合は、最後の1つのセルを残して、内容をクリアする
    const prevID = doc.cells[doc.cells.length - 1].id
    const cell = makeCell({ markdown: "", id: prevID, page: 1 });
  
    dispatch(setCells([cell]));
    return;
  }

  const nextCells = doc.cells.filter((_, index) => {
    return !(min <= index && index <= max);
  });

  const nextHead = crop(min, 0, nextCells.length - 1);
  const nextEditing = nextHead;

  dispatch(setUIState({
    head: nextHead,
    anchor: nextHead,
    editing: nextEditing
  }));

  dispatch(setCells(nextCells));
};

export const selectCell = ({ index, allowsMultiple }: { index: number, allowsMultiple?: boolean }): AppThunk => (dispatch, getState) => {
  const { present: { ui } } = getState();

  allowsMultiple = allowsMultiple || false;
  
  let nextHead = index;
  let nextEditing = ui.editingCell;
  let nextAnchor = ui.selectionAnchor;

  if (ui.editingCell != null) {
    nextEditing = index;  
  }

  if (!allowsMultiple) {
    nextAnchor = index;
  } else if (ui.selectionAnchor !== ui.selectionHead) {
    nextEditing = undefined;
  }

  dispatch(setUIState({
    head: nextHead,
    anchor: nextAnchor,
    editing: nextEditing
  }));
};

const _selectArrow = ({ direction, allowsMultiple }: { direction: number, allowsMultiple?: boolean }): AppThunk => (dispatch, getState) => {
  const { present: { doc, ui } } = getState();

  const currentCursor = ui.selectionHead;
  const nextCursor = crop(currentCursor + direction, 0, doc.cells.length - 1);

  console.log("selectArrow", currentCursor, nextCursor);
  dispatch(selectCell({ index: nextCursor, allowsMultiple }));
}

export const selectUp = ({ allowsMultiple }: { allowsMultiple?: boolean } = {}): AppThunk => (dispatch, getState) => {
  dispatch(_selectArrow({ direction: -1, allowsMultiple }));
}

export const selectDown = ({ allowsMultiple }: { allowsMultiple?: boolean } = {}): AppThunk => (dispatch, getState) => {
  dispatch(_selectArrow({ direction: 1, allowsMultiple }));
}

const _moveCell = ({ target }: { target: number }): AppThunk => (dispatch, getState) => {
  const { present: { doc, ui } } = getState();

  if (doc.cells.length <= 1) return;
  if (target < 0 || doc.cells.length <= target) return;
  
  const [min, max] = minmax(ui.selectionHead, ui.selectionAnchor);
  const headCellID = doc.cells[min].id;
  const anchorCellID = doc.cells[max].id;
  const editingCellID = ui.editingCell != null ? doc.cells[ui.editingCell].id : undefined;

  const nextCells = arrayMove(doc.cells, { from: min, to: max+1 }, target);
  const nextHead = nextCells.findIndex(cell => cell.id === headCellID) ?? 0;
  const nextAnchor = nextCells.findIndex(cell => cell.id === anchorCellID) ?? 0;
  const nextEditingCellIndex = editingCellID != null ? nextCells.findIndex(cell => cell.id === editingCellID) : undefined;

  dispatch(setUIState({
    head: nextHead,
    anchor: nextAnchor,
    editing: nextEditingCellIndex
  }));

  dispatch(setCells(nextCells));
  dispatch(_reattachPageIndex());
}

export const moveUp = (): AppThunk => (dispatch, getState) => {
  const { present: { ui } } = getState();
  const [min] = minmax(ui.selectionHead, ui.selectionAnchor);
  dispatch(_moveCell({ target: min - 1 }));
}

export const moveDown = (): AppThunk => (dispatch, getState) => {
  const { present: { ui } } = getState();
  const [, max] = minmax(ui.selectionHead, ui.selectionAnchor);
  dispatch(_moveCell({ target: max + 1 }));
}

export const editCell = ({ index, allowsMultiple }: { index?: number, allowsMultiple?: boolean } = {}): AppThunk => (dispatch, getState) => {
  const { present: { ui } } = getState();
  const nextEditing = index ?? ui.selectionHead;
  dispatch(setEditing(nextEditing));
  dispatch(selectCell({ index: nextEditing, allowsMultiple }));
}

export const escapeCell = (): AppThunk => (dispatch, getState) => {
  dispatch(setEditing(undefined));
}

export const selectDownAndNewCellIfBottom = (): AppThunk => (dispatch, getState) => {
  dispatch(selectDown({ allowsMultiple: true }));
  const { present: { doc, ui } } = getState();
  if (ui.selectionHead === doc.cells.length - 1) {
    dispatch(addCell());
  }
}

export const moveSelectedCells = ({ index }: { index: number }): AppThunk => (dispatch, getState) => {
  const { present: { doc, ui } } = getState();

  const [min, max] = minmax(ui.selectionHead, ui.selectionAnchor);
  const headCellID = doc.cells[min].id;
  const anchorCellID = doc.cells[max].id;
  const editingCellID = ui.editingCell != null ? doc.cells[ui.editingCell].id : undefined;

  const nextCells = arrayMove(doc.cells, { from: min, to: max+1 }, index);
  const nextHead = nextCells.findIndex(cell => cell.id === headCellID) ?? 0;
  const nextAnchor = nextCells.findIndex(cell => cell.id === anchorCellID) ?? 0;
  const nextEditingCellIndex = editingCellID != null ? nextCells.findIndex(cell => cell.id === editingCellID) : undefined;

  dispatch(setUIState({
    head: nextHead,
    anchor: nextAnchor,
    editing: nextEditingCellIndex
  }));

  dispatch(setCells(nextCells));
  dispatch(_reattachPageIndex());
}

export const _reattachPageIndex = (): AppThunk => (dispatch, getState) => {
  const { present: { doc } } = getState();

  const newCells = [];
  for (let i = 0; i < doc.cells.length; i++) {
    const cell = doc.cells[i];
    newCells.push({ ...cell, page: i+1 });
  }

  dispatch(setCells(newCells));
}