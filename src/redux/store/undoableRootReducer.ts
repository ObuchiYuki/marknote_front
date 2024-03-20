import undoable from "redux-undo";
import { rootReducer } from "./rootReducer";

let disposer: NodeJS.Timeout | null = null;

export const undoableRootReducer = undoable(rootReducer, {
  filter: (action) => {
    if (action.type.startsWith("ui/")) return false;
    if (!disposer) {
      disposer = setTimeout(() => { disposer = null }, 500)
      return true
    }
    return false
  }
});
