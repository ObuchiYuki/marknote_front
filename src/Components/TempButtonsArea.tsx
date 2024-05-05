import { addCell, editCell, escapeCell, moveDown, moveUp, removeCell, selectDown, selectDownAndNewCellIfBottom, selectUp } from '../redux/thunk/cellThunks';
import { toggleBold } from '../redux/thunk/markdownThunks';
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import styled from "styled-components";
import { useAppDispatch } from "../hooks/useRedux";
import { toggleSidebar } from '../redux/thunk/uiThunks';

const TempButtonsAreaBackground = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  padding: 20px;
`

const TempButton = styled.button<{ $color?: string }>`
  background-color: ${props => props.$color ?? "#67A4E9"};
  border: none;
  color: white;
  padding: 8px;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 4px 2px;
  cursor: pointer;
`

const TempButtonContainer = styled.div`
  display: flex;
  gap: 8px;
`

export const TempButtonsArea = (props: { style?: React.CSSProperties }) => {
  const dispatch = useAppDispatch();

  return (
    <TempButtonsAreaBackground onClick={(e) => {e.preventDefault(); e.stopPropagation()}} style={props.style}>
      <TempButtonContainer>
        <TempButton onClick={() => { dispatch(toggleSidebar()) }} $color="#e967d1">Sidebar</TempButton>
      </TempButtonContainer>
      <TempButtonContainer>
        <TempButton onClick={() => { dispatch(UndoActionCreators.undo()) }} $color="#e967d1">Undo</TempButton>
        <TempButton onClick={() => { dispatch(UndoActionCreators.redo()) }} $color="#e967d1">Redo</TempButton>
        <TempButton onClick={() => { dispatch(addCell()) }} $color="#67A4E9">Add Cell</TempButton>
        <TempButton onClick={() => { dispatch(removeCell()) }} $color="#67A4E9">Remove Cell</TempButton>
        <TempButton onClick={() => { dispatch(moveUp()) }} $color="#2cca93">Move ↑</TempButton>
        <TempButton onClick={() => { dispatch(moveDown()) }} $color="#2cca93">Move ↓</TempButton>
      </TempButtonContainer>
      <TempButtonContainer>
        <TempButton onClick={() => { dispatch(selectUp()) }} $color="#f4a53e">Select ↑</TempButton>
        <TempButton onClick={() => { dispatch(selectDown()) }} $color="#f4a53e">Select ↓</TempButton>
        <TempButton onClick={() => { dispatch(selectUp({ allowsMultiple: true })) }} $color="#f4a53e">Select ↑+s</TempButton>
        <TempButton onClick={() => { dispatch(selectDown({ allowsMultiple: true })) }} $color="#f4a53e">Select ↓+s</TempButton>
        <TempButton onClick={() => { dispatch(editCell()) }} $color="#f4a53e">Edit</TempButton>
        <TempButton onClick={() => { dispatch(escapeCell()) }} $color="#f4a53e">Escape</TempButton>
        <TempButton onClick={() => { dispatch(selectDownAndNewCellIfBottom()) }} $color="#f4a53e">selectDownAndNewCellIfBottom</TempButton>
      </TempButtonContainer>

      <TempButtonContainer>
        <TempButton onClick={() => { dispatch(toggleBold()) }} $color="#3e4df4">Toggle Bold</TempButton>
        <TempButton onClick={() => { dispatch(toggleBold()) }} $color="#3e4df4">Toggle Italic</TempButton>
      </TempButtonContainer>
      
    </TempButtonsAreaBackground>
  );
}