import { combineReducers } from "@reduxjs/toolkit";
import { uiSlice } from "../uiSlice";
import { documentSlice } from "../documentSlice";

export const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  doc: documentSlice.reducer
});
