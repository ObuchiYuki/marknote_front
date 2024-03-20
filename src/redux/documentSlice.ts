import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MarkNodeCell, initialState } from "../model/MarkNoteDocument";
import { debouncePostDocumentChange } from "./connector/postDocumentChange";

export const documentSlice = createSlice({
  name: 'document',
  initialState: initialState,
  reducers: {
    setCells: (state, action: PayloadAction<MarkNodeCell[]>) => {
      state.cells = action.payload

      debouncePostDocumentChange()
    }    
  }
});

export const { setCells } = documentSlice.actions;
