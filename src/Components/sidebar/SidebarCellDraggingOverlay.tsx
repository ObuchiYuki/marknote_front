import styled, { keyframes } from "styled-components";
import { SidebarCellIndex } from "./SidebarCell";
import { MarkNoteCell } from "../../model/MarkNoteDocument";
import { SidebarSlideRenderView } from "./SidebarSlideRenderView";

const CellContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: flex-end;
  gap: 4px;
  position: relative;
`

const scaleAnimation = keyframes`
  0%, 100% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1.13);
  }
`

const RenderViewContainer = styled.div`
  position: relative;
  animation: ${scaleAnimation} 1s infinite;
`

const ShadowView = styled.div`
  border-radius: 2px;
  box-shadow: 0 12px 4px rgba(0, 0, 0, 0.3);
`

export type SidebarCellDraggingOverlayProps = {
  cell: MarkNoteCell,
  subCell?: MarkNoteCell,
}

export const SidebarCellDraggingOverlay = ({ cell, subCell }: SidebarCellDraggingOverlayProps) => {
  return (
    <CellContainer>
      <SidebarCellIndex $isHead={false} $isDragOverlay={true}>0</SidebarCellIndex>
      <ShadowView>
        <RenderViewContainer>
          {subCell &&
            <SidebarSlideRenderView 
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
                width: "100%",
                height: "100%",
                transformOrigin: "0 50%",
                transform: "rotate(-3deg)",
              }}
              cell={subCell} 
              isDragOverlay={true}
            />
          }
          <SidebarSlideRenderView 
            cell={cell} 
            isDragOverlay={true}
          />
        </RenderViewContainer>
      </ShadowView>
    </CellContainer>
  )
};