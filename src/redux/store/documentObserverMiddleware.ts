import { debouncePostDocumentChange } from "../connector/postDocumentChange";

export const documentObserverMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type.startsWith("ui/")) return next(action);
  const state = next(action);
  debouncePostDocumentChange();
  return state
};