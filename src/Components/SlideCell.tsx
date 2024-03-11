import { useState } from 'react'
import styled from 'styled-components'

import { useMarkdownEditor } from '../hooks/markdown/useMarkdownEditor';
import { Slide } from '../types/slide';

const SlideCellBackground = styled.div`
  background-color: red;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  padding: 12px;
`

export const SlideCell = (slide: Slide) => {
  return (
    <SlideCellBackground>
      <style>{slide.css}</style>
      <div dangerouslySetInnerHTML={{__html: slide.html}} />
    </SlideCellBackground>
  );
}
  
  