import { MarkNoteDocument } from "../model/MarkNoteDocument"
import { configureStore, createReducer, createSlice } from "@reduxjs/toolkit"
import { cellReducer } from "./CellReducer"

const mockInitialState: MarkNoteDocument = {
  title: "Untitled",
  cells: [],
  selectedCellId: null,
}

const documentSlice = createSlice({
  name: 'documentSlice',
  initialState: mockInitialState,
  reducers: {
    ...cellReducer,
  },
})

