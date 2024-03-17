import { nanoid } from "@reduxjs/toolkit";
import { MarkNodeCell } from "../model/MarkNoteDocument";
import { convertMarkdownToSlide } from "./convertMarkdownToSlide";

export const makeCell = (initialMarkdown: string) => {
  const html = convertMarkdownToSlide(initialMarkdown)
  const cellID = nanoid();
  const cell: MarkNodeCell = {
    id: cellID,
    markdown: { content: initialMarkdown },
    slide: { html: html.html }
  }
  return cell;
}