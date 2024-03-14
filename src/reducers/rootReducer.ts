import { mockInitialState } from "../model/MarkNoteDocument"
import { cellReducer } from "./cellReducer"
import { markdownReducer } from "./markdownReducer"
import { concatReducers } from "../redux-ex/concatReducers"

const reducers = {
  ...cellReducer,
  ...markdownReducer
}

export const rootReducer = concatReducers(
  mockInitialState, reducers
);