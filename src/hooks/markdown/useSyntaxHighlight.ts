import { tags } from "@lezer/highlight"
import { useMemo } from 'react'
import { syntaxHighlighting, HighlightStyle } from "@codemirror/language"

const highlightStyle = HighlightStyle.define([
  { tag: tags.heading1, color: 'black', fontSize: '1.4em', fontWeight: '700' },
  { tag: tags.heading2, color: 'black', fontSize: '1.3em', fontWeight: '700' },
  { tag: tags.heading3, color: 'black', fontSize: '1.2em', fontWeight: '700' },
  { tag: tags.heading4, color: 'black', fontSize: '1.1em', fontWeight: '700' },
  { tag: tags.strong, color: 'black', fontWeight: '700' }, // 太字
  { tag: tags.quote, color: '#6a737d' }, // 引用
  { tag: tags.emphasis, fontStyle: 'italic' }, // 斜体
  { tag: tags.url, textDecoration: 'underline' }, // URLに下線をつける
  { tag: tags.strikethrough, textDecoration: 'line-through' }, // 打ち消し線（GFM拡張）
  { tag: tags.monospace, backgroundColor: '#f6f8fa', padding: '2px 4px', }, // コードブロック

  // リスト
  { tag: tags.keyword, color: '#d73a49' }, // キーワード
  { tag: tags.string, color: '#b72e7c' }, // 文字列
]);

export const useSyntaxHighlight= () => {
  return useMemo(() => syntaxHighlighting(highlightStyle), []);
}