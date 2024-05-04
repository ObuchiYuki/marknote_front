export type MarkNodeUIState = {
  selectionAnchor: number; // 選択のアンカー (index)
  selectionHead: number; // 編集中のセル | 選択の先頭 (index)

  editingCell?: number; // (index)

  sidebarCollapsed: boolean;
}

export const initialState: MarkNodeUIState = {
  selectionAnchor: 0,
  selectionHead: 0,
  sidebarCollapsed: false
}