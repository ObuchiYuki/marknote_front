import { useState } from 'react'
import styled from 'styled-components'

import { useMarkdownEditor } from '../hooks/markdown/useMarkdownEditor';
import { Slide } from '../types/slide';

const SlideCellBackground = styled.div`
  display: flex;
  justify-content: center;
`

const SlideCellContainer = styled.div`
  width: 640px;
  height: 360px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.15);
`

export const SlideCell = ({ slide }: { slide: Slide }) => {
  return (
    <SlideCellBackground>
    <SlideCellContainer>
      <style>{slide.css}</style>
      <style>
        {`
          .slide {
            transform: scale(0.5) translate(-50%, -50%);
          }
        `}
      </style>
      <div dangerouslySetInnerHTML={{__html: slide.html}} className='slide' />
    </SlideCellContainer>
    </SlideCellBackground>
  );
}
  
  