import { LegacyRef, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { MarkNodeCell } from "../../model/MarkNoteDocument";
import styled from "styled-components";
import { SidebarCell } from "./SidebarCell";

export type SidebarProps = {
  collapsed: boolean,
}

const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  height: 100%;
  padding: 24px 0;
  background-color: #f4f4f4;
  overflow-y: auto; /* Enable vertical scrollbar for overflow content */
  width: ${props => props.$collapsed ? "0px" : "250px"};
  transition: width 0.3s;
  box-shadow: inset -6px 0px 3px -4px rgba(0, 0, 0, 0.1);

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const doc = useAppSelector(state => state.present.doc);
  const sidebarCollapsed = useAppSelector(state => state.present.ui.sidebarCollapsed);

  return (
    <SidebarContainer $collapsed={sidebarCollapsed}>
      {doc.cells.map((cell, index) => (
        <SidebarCell 
          key={index} 
          cell={cell} 
          index={index} 
          head={index === 0} 
          selected={false} 
          aboveSelected={false} 
          belowSelected={false} 
        />
      ))}

    </SidebarContainer>
  );
};
