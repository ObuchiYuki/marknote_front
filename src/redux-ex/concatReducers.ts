import { Reducer, Action } from "@reduxjs/toolkit";

export type ReducerMapObject<S, A extends Action<any>, Keys extends string = string> = {
  [K in Keys]: (state: S, action: A extends Action<K> ? A : never) => S;
};

export const concatReducers = <S, A extends Action<Keys>, Keys extends string = string>(
  initialState: S,
  reducers: ReducerMapObject<S, A, Keys>
): Reducer<S, A> => {
    return (state: S | undefined, action: A) => {
      if (state === undefined) {
        return initialState;
      }
      const reducer = reducers[action.type];
      if (reducer) {
        return reducer(state, action as any);
      }
      return state;
    }
};

// const cellReducer = {
//   addCell(state: MarkNoteDocument, action: {}) {
//     console.log("addCell");
//     return state
//   },
//   removeCell(state: MarkNoteDocument, action: {}) {
//     console.log("removeCell");
//     return state
//   }
// }

// const markdownReducer = {
//   toggleBold(state: MarkNoteDocument, action: {}) {
//     console.log("toggleBold");
//     return state
//   },
//   toggleItalic(state: MarkNoteDocument, action: {}) {
//     console.log("toggleItalic");
//     return state
//   }
// }

// const rootReducer = concatReducers<MarkNoteDocument, { type: string }>(
//   mockInitialState,
//   {
//     ...cellReducer,
//     ...markdownReducer
//   }
// );

// const store = configureStore({
//   reducer: rootReducer
// });

// store.dispatch({ type: "addCell" });