import { Marp } from '@marp-team/marp-core'
import { SlideContent } from '../model/MarkNoteDocument'

export const convertMarkdownToSlide = (markdown: string): SlideContent => {
  const marp = new Marp({
    inlineSVG: false,
    script: false,
  })
  
  const { html, css } = marp.render(markdown)

  return {
    html: html,
    css: css,
    size: { width: 1280, height: 720 }
  }
}
