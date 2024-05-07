import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MarkNoteCell } from "../../model/MarkNoteDocument";

const SIDEBAR_SLIDE_RENDER_WIDTH = 90;

const SidebarSlideRenderViewContainer = styled.div<{ $isDragOverlay: boolean }>`
  width: ${SIDEBAR_SLIDE_RENDER_WIDTH}px;
  height: auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${props => props.$isDragOverlay ? "0 4px 20px 0 rgba(0,0,0,0.5)" : "0 0 5px rgba(0, 0, 0, 0.2)"};
`

export type SidebarSlideRenderViewProps = {
  cell: MarkNoteCell,
  isDragOverlay?: boolean,
}

export const SidebarSlideRenderView = ({ cell, isDragOverlay }: SidebarSlideRenderViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideSize, setSlideSize] = useState<{ width: number, height: number }>({ width: 1280, height: 720 });
  const [scaleFactor, setScaleFactor] = useState(0);
  
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const size = { width: entry.borderBoxSize[0].inlineSize, height: entry.borderBoxSize[0].blockSize }
        const newScaleFactor = SIDEBAR_SLIDE_RENDER_WIDTH / Math.max(size.width, size.height);
        setSlideSize(size);
        setScaleFactor(newScaleFactor);
      }
    });

    if (containerRef.current) {
      const element = containerRef.current?.children[0]?.children[0] as HTMLElement;
      resizeObserver.observe(element);
    } 

    return () => resizeObserver.disconnect();
  }, []);

  const width = slideSize.width * scaleFactor;
  const height = slideSize.height * scaleFactor;

  return (
      <SidebarSlideRenderViewContainer
        style={{
          width: `${width}px`,
          minWidth: `${width}px`,
          height: `${height}px`,
          minHeight: `${height}px`,
        }}
        $isDragOverlay={isDragOverlay ?? false}
      >

        <div 
            ref={containerRef}
            className='slide'
            style={{ 
              transform: `scale(${scaleFactor})`, 
              transformOrigin: 'top left',
            }}
            dangerouslySetInnerHTML={{__html: cell.slide.html}} 
        />

      </SidebarSlideRenderViewContainer>
  );
}