import { nanoid } from "@reduxjs/toolkit";
import { MarkNodeCell } from "../model/MarkNoteDocument";
import { convertMarkdownToSlide } from "./convertMarkdownToSlide";

export const makeCell = ({ markdown, id }: { markdown?: string, id?: string }) => {
  markdown = markdown ?? "";
  const slide = convertMarkdownToSlide(markdown)
  const cellID = id ?? nanoid();
  const cell: MarkNodeCell = {
    id: cellID,
    markdown: { content: markdown },
    slide: slide
  }
  return cell;
}