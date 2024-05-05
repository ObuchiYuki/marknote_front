import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkNodeCell, initialState } from "../model/MarkNoteDocument";
import { debounceCallNativeDocumentChange } from "./connector/callNativeAction";

export const documentSlice = createSlice({
  name: 'document',
  initialState: initialState,
  reducers: {
    setCells: (state, action: PayloadAction<MarkNodeCell[]>) => {
      state.cells = action.payload

      debounceCallNativeDocumentChange()
    }    
  }
});

export const { setCells } = documentSlice.actions;
