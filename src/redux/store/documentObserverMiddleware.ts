import { debounceCallNativeDocumentChange } from "../connector/callNativeAction";

export const documentObserverMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type.startsWith("ui/")) return next(action);
  const state = next(action);
  debounceCallNativeDocumentChange();
  return state
};