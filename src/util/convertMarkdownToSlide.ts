import { Marp } from '@marp-team/marp-core'
import { SlideContent } from '../model/MarkNoteDocument'

export const convertMarkdownToSlide = (markdown: string): SlideContent => {
  const marp = new Marp({
    inlineSVG: false,
    script: false,
  })
  
  return marp.render(markdown)
}
