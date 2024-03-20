import { MarkNoteDocument } from "../model/MarkNoteDocument";

export const convertDocumentToMarkdown = (document: MarkNoteDocument): string => {
  let markdown = "";

  for (const cell of document.cells) {
    markdown += cell.markdown.content + "\n\n- - - - - - - - - - - - - -\n\n";
  }

  return markdown;
}