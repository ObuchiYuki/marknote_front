import styled from 'styled-components'

const AreaContainer = styled.div`
  display: flex;
  justify-content: center;
`

const AreaBackground = styled.div`
  border-radius: 6px;
  overflow: hidden;
  height: 300px;
  border: 1px solid rgba(0, 0, 0, 0.15);
`

export type SlideAreaProps = {
  slide: { html: string }
  slideSize?: { width: number, height: number }
  slideScale?: number
}

export const SlideArea = ({ slide, slideSize, slideScale }: SlideAreaProps) => {
  const size = slideSize ?? { width: 1280, height: 720 }
  const scale = slideScale ?? 0.5

  return (
    <AreaContainer>
      <AreaBackground
        style={{ width: `${size.width * scale}px`, height: `${size.height * scale}px`, overflow: 'hidden' }}
      >
        <div 
          className='slide'
          style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
          dangerouslySetInnerHTML={{__html: slide.html}} 
        >
        </div>
      </AreaBackground>
    </AreaContainer>
  );
}
  
  