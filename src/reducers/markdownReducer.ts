import { MarkNoteDocument } from "../model/MarkNoteDocument";
import { convertMarkdownToSlide } from "./convert/convertMarkdownToSlide";

export const markdownReducer = {
  toggleBold(state: MarkNoteDocument, action: { value: number }): MarkNoteDocument {
    console.log("toggleBold");
    return state
  },

  updateMarkdown(state: MarkNoteDocument, action: { content: string, id: number }): MarkNoteDocument {
    const groups = state.groups.map(group => {
      if (group.id === action.id) {
        const slide = convertMarkdownToSlide(action.content);

        return {
          ...group,
          markdown: {
            ...group.markdown,
            content: action.content,
          },
          slide: slide
        }
      } else {
        return group;
      }
    });

    return {
      ...state,
      groups: groups,
    }
  }
}