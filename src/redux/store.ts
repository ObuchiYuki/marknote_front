import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./uiSlice";
import { documentSlice } from "./documentSlice";
import undoable from "redux-undo";

const rootReducer = combineReducers({
  ui: uiSlice.reducer,
  doc: documentSlice.reducer
});

let disposer: NodeJS.Timeout | null = null;

const undoableRootReducer = undoable(rootReducer, {
  filter: (action) => {
    if (action.type.startsWith("ui/")) return false;
    if (!disposer) {
      disposer = setTimeout(() => { disposer = null }, 1000)
      return true
    }
    return false
  }
});

export const store = configureStore({
  reducer: undoableRootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;