import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./uiSlice";
import { documentSlice } from "./documentSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    doc: documentSlice.reducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;