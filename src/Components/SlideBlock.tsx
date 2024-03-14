import styled from 'styled-components'

const SlideBlockContainer = styled.div`
  display: flex;
  justify-content: center;
`

const SlideBlockBackground = styled.div`
  width: 640px;
  height: 360px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.15);
`

export const SlideBlock = ({ slide }: { slide: { html: string, css: string } }) => {
  return (
    <SlideBlockContainer>
      <SlideBlockBackground>
      <style>{slide.css}</style>
      <style>
        {`
          .slide {
            transform: scale(0.5) translate(-50%, -50%);
          }
        `}
      </style>
      <div dangerouslySetInnerHTML={{__html: slide.html}} className='slide' />
      </SlideBlockBackground>
    </SlideBlockContainer>
  );
}
  
  