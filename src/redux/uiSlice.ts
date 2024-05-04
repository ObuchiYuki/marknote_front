import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "../model/MarkNodeUIState";

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setAnchor: (state, action: PayloadAction<number>) => {
      state.selectionAnchor = action.payload
    },
    setHead: (state, action: PayloadAction<number>) => {
      state.selectionHead = action.payload
    },
    setEditing: (state, action: PayloadAction<number|undefined>) => {
      state.editingCell = action.payload
    },
    setSelection: (state, action: PayloadAction<{ head: number, anchor: number }>) => {
      state.selectionHead = action.payload.head;
      state.selectionAnchor = action.payload.anchor;
    },
    setUIState(state, action: PayloadAction<{ head: number, anchor: number, editing?: number }>) {
      state.selectionHead = action.payload.head;
      state.selectionAnchor = action.payload.anchor;
      state.editingCell = action.payload.editing;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
    }
  }
});

export const { setAnchor, setHead, setEditing, setSelection, setUIState, setSidebarCollapsed } = uiSlice.actions;