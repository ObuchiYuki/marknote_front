import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { undoableRootReducer } from "./undoableRootReducer";
import { documentObserverMiddleware } from "./documentObserverMiddleware";

export const store = configureStore({
  reducer: undoableRootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(documentObserverMiddleware)
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;