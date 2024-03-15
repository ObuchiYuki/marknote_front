import { mockInitialState } from "../model/MarkNoteDocument"
import { cellReducer } from "./CellReducer"
import { markdownReducer } from "./MarkdownReducer"
import { concatReducers } from "../redux-ex/concatReducers"

const reducers = {
  ...cellReducer,
  ...markdownReducer
}

export const rootReducer = concatReducers(
  mockInitialState, reducers
);