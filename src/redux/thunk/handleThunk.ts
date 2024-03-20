import { store } from "../store";
import * as cellThunks from "./cellThunks";
import * as markdownThunks from "./markdownThunks";

export type ThunkSelector = {
  type: string,
  payload: any
};
                      
const rootThunk = {
  ...cellThunks,
  ...markdownThunks
} as any

export const handleThunk = (selector: ThunkSelector) => {
  const { type, payload } = selector;

  const module = rootThunk[type];

  if (!module) {
    throw new Error(`No thunk function found for type "${type}"`);
  }

  const thunkFunction = module[type] as Function; 
  store.dispatch(thunkFunction(...payload));
}