import { debounce } from "lodash";
import { convertDocumentToMarkdown } from "../../util/convertDocumentToMarkdown";
import { store } from "../store/store";


const postMessage = ({ type, message }: { type: string, message: unknown }) => {
  // @ts-ignore
  window.webkit.messageHandlers[type].postMessage(message);
}

export const postDocumentChange = () => {
  const { present: { doc } } = store.getState();
  const markdown = convertDocumentToMarkdown(doc);
  postMessage({ type: "setdoc", message: markdown });
}

export const debouncePostDocumentChange = debounce(postDocumentChange, 500);