import { MarkNoteDocument } from "../model/MarkNoteDocument";
import { convertMarkdownToSlide } from "./util/convertMarkdownToSlide";

export const markdownReducer = {
  toggleBold(state: MarkNoteDocument, action: { value: number }): MarkNoteDocument {
    console.log("toggleBold");
    return state
  },

  updateMarkdown(state: MarkNoteDocument, action: { content: string, index: number }): MarkNoteDocument {
    const cells = state.cells.map((cell, index) => {
      if (index === action.index) {
        const slide = convertMarkdownToSlide(action.content);

        return {
          ...cell,
          markdown: {
            ...cell.markdown,
            content: action.content,
          },
          slide: slide
        }
      } else {
        return cell;
      }
    });

    return {
      ...state,
      cells: cells,
    }
  }
}