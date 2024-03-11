import { Marp } from '@marp-team/marp-core'

export const convertMarkdownToSlide = (markdown: string): { html: string, css: string } => {
  const marp = new Marp({
    
  })
  const { html, css } = marp.render(markdown)
  return { html, css }
}