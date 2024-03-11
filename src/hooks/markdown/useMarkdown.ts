import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { javascript } from "@codemirror/lang-javascript"
import { useMemo } from 'react'
import { LanguageDescription } from "@codemirror/language"

const codeLanguages = [
  LanguageDescription.of({ 
    name: 'javascript', 
    alias: ['js', "jsx"],
    support: javascript({}) }
  ),
  LanguageDescription.of({
    name: 'typescript',
    alias: ['ts', "tsx"],
    support: javascript({ typescript: true }) }
  )
];

export const useMarkdown = () => {
  return useMemo(() => markdown({
    base: markdownLanguage,
    completeHTMLTags: false,
    codeLanguages: codeLanguages,
  }), []);
}