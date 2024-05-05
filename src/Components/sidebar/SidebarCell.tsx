import styled from "styled-components";
import { MarkNodeCell } from "../../model/MarkNoteDocument";
import { useEffect, useRef, useState } from "react";

const SIDEBAR_CELL_WIDTH = 200;

export type SidebarCellProps = {
  cell: MarkNodeCell,

  index: number,
  
  head: boolean,
  selected: boolean,
  aboveSelected: boolean,
  belowSelected: boolean,
}

const SidebarCellContainer = styled.div`
  width: ${SIDEBAR_CELL_WIDTH}px;
  height: auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
`

export const SidebarCell = ({ cell, index, head, selected, aboveSelected, belowSelected }: SidebarCellProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideSize, setSlideSize] = useState<{ width: number, height: number }>({ width: 1280, height: 720 });
  const [scaleFactor, setScaleFactor] = useState(1);
  
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const size = { width: entry.borderBoxSize[0].inlineSize, height: entry.borderBoxSize[0].blockSize }
        const newScaleFactor = SIDEBAR_CELL_WIDTH / Math.max(size.width, size.height);
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
      <SidebarCellContainer
        style={{
          width: `${width}px`,
          height: `${height}px`,
          minHeight: `${height}px`,
        }}
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

      </SidebarCellContainer>
  );
}