import { nanoid } from "@reduxjs/toolkit";
import { MarkNoteCell } from "../model/MarkNoteDocument";
import { convertMarkdownToSlide } from "./convertMarkdownToSlide";

export const makeCell = ({ markdown, id, page }: { markdown?: string, id?: string, page: number }) => {
  markdown = markdown ?? "";
  const slide = convertMarkdownToSlide(markdown)
  const cellID = id ?? nanoid();
  const cell: MarkNoteCell = {
    id: cellID,
    markdown: { content: markdown },
    slide: slide,
    page: page
  }
  return cell;
}