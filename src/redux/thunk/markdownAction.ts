import { convertMarkdownToSlide } from "../../util/convertMarkdownToSlide";
import { setCells } from "../documentSlice";
import { AppThunk } from "../store";

export const toggleBold = (): AppThunk => (dispatch, getState) => {
  console.log("toggleBold");
}

export const updateMarkdown = ({ content, index }: {content: string, index: number}): AppThunk => (dispatch, getState) => {
  const { doc } = getState();
  const cells = doc.cells.map((cell, i) => {
    if (i === index) {
      const slide = convertMarkdownToSlide(content);

      return {
        ...cell,
        markdown: {
          ...cell.markdown,
          content: content,
        },
        slide: slide
      }
    } else {
      return cell;
    }
  });

  dispatch(setCells(cells));
}