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
    transform: scale(1.07);
  }
  50% {
    transform: scale(1.12);
  }
`

const RenderViewContainer = styled.div`
  position: relative;
  animation: ${scaleAnimation} 1s infinite;
`

const ShadowView = styled.div<{ $shadowOpacity: number }>`
  border-radius: 4px;
  box-shadow: 0 12px 4px -1px rgba(0, 0, 0, ${props => props.$shadowOpacity});
`

export type SidebarCellDraggingOverlayProps = {
  cell: MarkNoteCell,
  subCell1?: MarkNoteCell,
  subCell2?: MarkNoteCell,
}

export const SidebarCellDraggingOverlay = ({ cell, subCell1, subCell2 }: SidebarCellDraggingOverlayProps) => {
  const createSubCellView = ({ cell, zIndex, origin, transform }: { cell: MarkNoteCell, zIndex: number, origin: string, transform: string }) => {
    return (
      <SidebarSlideRenderView 
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: zIndex,
          width: "100%",
          height: "100%",
          transformOrigin: origin,
          transform: transform
        }}
        cell={cell} 
        isDragOverlay={true}
      />
    )
  }

  let shadowOpacity = 0.3;
  if (subCell1) { shadowOpacity = 0.43; }
  if (subCell2) { shadowOpacity = 0.56; }

  return (
    <CellContainer>
      <SidebarCellIndex $isHead={false} $isDragOverlay={true}>0</SidebarCellIndex>
      <ShadowView $shadowOpacity={shadowOpacity}>
        <RenderViewContainer>
          {subCell2 && createSubCellView({
            cell: subCell2,
            zIndex: -2,
            origin: "0 0",
            transform: "rotate(4deg)"
          })}
          {subCell1 && createSubCellView({
            cell: subCell1,
            zIndex: -1,
            origin: "0 0",
            transform: "rotate(-4deg)"
          })}
          <SidebarSlideRenderView cell={cell} isDragOverlay={false}/>
        </RenderViewContainer>
      </ShadowView>
    </CellContainer>
  )
};