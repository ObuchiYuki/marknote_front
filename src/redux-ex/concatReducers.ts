import { Reducer, Action } from "redux"

type ReducerAction = any

type ReducerFunction<S> = (state: S, action: ReducerAction) => S;

export type Reducers<State> = {
  [key: string]: ReducerFunction<State>;
};

export type ToAction<State, R extends Reducers<State>> = {
  [K in keyof R as Extract<K, string>]: R[K] extends (state: State, action: infer A) => State ? { type: K } & A : never
}[Extract<keyof R, string>];

export type ToReducer<S, A extends Action> = {
  [K in A['type']]: (state: S, action: Extract<A, { type: K }>) => S;
};

export const concatReducers = <S, R extends Reducers<S>, A extends Action = ToAction<S, R>>(
  initialState: S, reducers: R
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
}


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