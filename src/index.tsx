import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './components/GlobalStyle'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store';
import { Notebook } from './components/Notebook';
import { useAppDispatch } from './hooks/useRedux';
import styled from 'styled-components';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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

const TempButtonsArea = () => {
  const dispatch = useAppDispatch();

  const addCell = () => { dispatch({ type: "addCell" }); }
  const removeCell = () => { dispatch({ type: "removeCell" }); }

  const selectUp = () => { dispatch({ type: "selectUp" }); }
  const selectDown = () => { dispatch({ type: "selectDown" }); }
  const selectUpWithShift = () => { dispatch({ type: "selectUp", allowsMultiple: true }); }
  const selectDownWithShift = () => { dispatch({ type: "selectDown", allowsMultiple: true }); }

  const moveUp = () => { dispatch({ type: "moveUp" }); }
  const moveDown = () => { dispatch({ type: "moveDown" }); }
  
  const editCell = () => { dispatch({ type: "editCell" }); }
  const escapeCell = () => { dispatch({ type: "escapeCell" }); }

  return (
    <TempButtonsAreaBackground onClick={(e) => {e.preventDefault(); e.stopPropagation()}}>
      <TempButtonContainer>
        <TempButton onClick={addCell} $color="#67A4E9">Add Cell</TempButton>
        <TempButton onClick={removeCell} $color="#67A4E9">Remove Cell</TempButton>
      </TempButtonContainer>
      <TempButtonContainer>
        <TempButton onClick={selectUp} $color="#f4a53e">Select ↑</TempButton>
        <TempButton onClick={selectDown} $color="#f4a53e">Select ↓</TempButton>
        <TempButton onClick={selectUpWithShift} $color="#f4a53e">Select ↑+s</TempButton>
        <TempButton onClick={selectDownWithShift} $color="#f4a53e">Select ↓+s</TempButton>
        <TempButton onClick={editCell} $color="#f4a53e">Edit</TempButton>
        <TempButton onClick={escapeCell} $color="#f4a53e">Escape</TempButton>
      </TempButtonContainer>

      <TempButtonContainer>
        <TempButton onClick={moveUp} $color="#2cca93">Move ↑</TempButton>
        <TempButton onClick={moveDown} $color="#2cca93">Move ↓</TempButton>
      </TempButtonContainer>

      <TempButtonContainer>
        <TempButton onClick={selectUp} $color="#3e4df4">Toggle Bold</TempButton>
        <TempButton onClick={selectUp} $color="#3e4df4">Toggle Italic</TempButton>
      </TempButtonContainer>
      
    </TempButtonsAreaBackground>
  );
}

const AppContainer = () => {
  const dispatch = useAppDispatch();

  const backgroundClick = () => {
    dispatch({ type: "escapeCell" })
  }

  return (
    <div onClick={backgroundClick}>
      <TempButtonsArea/>
      <Notebook/>
    </div>
  );
}


const App = () => {
  return (
    <ReduxProvider store={store}>
      <AppContainer/>
    </ReduxProvider>
  );
}

root.render(
  <>
    <GlobalStyle/>
    <App/>
  </>
);

