import { LegacyRef } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { MarkNodeCell } from "../model/MarkNoteDocument";
import styled from "styled-components";

export type SidebarProps = {
  collapsed: boolean,
}

const SidebarContainer = styled.div<{ $collapsed: boolean }>`
  height: 100%;
  background-color: #f4f4f4;
  overflow-y: auto; /* Enable vertical scrollbar for overflow content */
  width: ${props => props.$collapsed ? "0px" : "250px"};
  transition: width 0.3s;
  background: red;
`;

const SidebarTestCell = styled.div` 
  background: blue;
  height: 250px;
`;

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const doc = useAppSelector(state => state.present.doc);
  const sidebarCollapsed = useAppSelector(state => state.present.ui.sidebarCollapsed);

  return (
    <SidebarContainer $collapsed={sidebarCollapsed}>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>
      <SidebarTestCell>Test Cell 1</SidebarTestCell>

    </SidebarContainer>
  );
};

export type SidebarCellProps = {
  cell: MarkNodeCell,

  index: number,
  
  head: boolean,
  selected: boolean,
  aboveSelected: boolean,
  belowSelected: boolean,
}

const SidebarCellBackground = styled.div<{ $head: boolean, $selected: boolean, $aboveSelected: boolean, $belowSelected: boolean }>`
  display: flex;
  gap: 20px;
  padding: 20px;
  flex-direction: column;
  border-left: 5px solid ${props => props.$head ? "#67A4E9" : "transparent"};
  background-color: ${props => props.$selected ? "#67a4e925" : props.$aboveSelected ? "#67a4e925" : props.$belowSelected ? "#67a4e925" : "transparent"};
`;

export const SidebarCell = ({ cell, index, head, selected, aboveSelected, belowSelected }: SidebarCellProps) => {
  const dispatch = useAppDispatch();

  return (
    <SidebarCellBackground $head={head} $selected={selected} $aboveSelected={aboveSelected} $belowSelected={belowSelected}>
      
    </SidebarCellBackground>
  );
}