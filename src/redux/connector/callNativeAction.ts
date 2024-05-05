import { debounce } from "lodash";
import { convertDocumentToMarkdown } from "../../util/convertDocumentToMarkdown";
import { store } from "../store/store";


const callNativeAction = ({ type, message }: { type: string, message: unknown }) => {
  try {
    // @ts-ignore
    window.webkit.messageHandlers[type].postMessage(message);
  } catch (e) {
    // if not in webview, ignore
    console.error(e);
  }
}

export const callNativeDocumentChange = () => {
  const { present: { doc } } = store.getState();
  const markdown = convertDocumentToMarkdown(doc);
  callNativeAction({ type: "setdoc", message: markdown });
}

export const debounceCallNativeDocumentChange = debounce(callNativeDocumentChange, 500);