import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkNoteCell, initialState } from "../model/MarkNoteDocument";
import { debounceCallNativeDocumentChange } from "./connector/callNativeAction";

export const documentSlice = createSlice({
  name: 'document',
  initialState: initialState,
  reducers: {
    setCells: (state, action: PayloadAction<MarkNoteCell[]>) => {
      state.cells = action.payload

      debounceCallNativeDocumentChange()
    }    
  }
});

export const { setCells } = documentSlice.actions;
