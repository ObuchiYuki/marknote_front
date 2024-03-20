import { store } from "../store/store";
import * as cellThunks from "../thunk/cellThunks";
import * as markdownThunks from "../thunk/markdownThunks";

export type ThunkSelector = {
  type: string,
  payload?: any
};
                      
const rootThunk = {
  ...cellThunks,
  ...markdownThunks
} as any

export const callAction = (selector: ThunkSelector) => {
  const { type, payload } = selector;

  const thunkFunction = rootThunk[type];

  if (!thunkFunction) {
    throw new Error(`No thunk function found for type "${type}"`);
  }

  if (payload) {
    store.dispatch(thunkFunction(...payload));
  } else {
    store.dispatch(thunkFunction());
  }
}

if (window) {
  // @ts-ignore
  window.callAction = callAction;
}