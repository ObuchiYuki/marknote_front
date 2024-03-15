import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './components/GlobalStyle'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './reducers/store';
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

  const addMarkdownCell = () => {
    dispatch({ type: "addCell" });
  }

  const selectUp = () => { dispatch({ type: "selectUp" }); }
  const selectDown = () => { dispatch({ type: "selectDown" }); }
  const selectUpWithShift = () => { dispatch({ type: "selectUp", allowsMultiple: true }); }
  const selectDownWithShift = () => { dispatch({ type: "selectDown", allowsMultiple: true }); }
  const editMarkdown = () => { dispatch({ type: "editCell" }); }

  return (
    <TempButtonsAreaBackground>
      <TempButtonContainer>
        <TempButton onClick={addMarkdownCell} $color="#67A4E9">Add Markdown</TempButton>
      </TempButtonContainer>
      <TempButtonContainer>
        <TempButton onClick={selectUp} $color="#f4a53e">Select ↑</TempButton>
        <TempButton onClick={selectDown} $color="#f4a53e">Select ↓</TempButton>
        <TempButton onClick={selectUpWithShift} $color="#f4a53e">Select ↑+s</TempButton>
        <TempButton onClick={selectDownWithShift} $color="#f4a53e">Select ↓+s</TempButton>
        <TempButton onClick={editMarkdown} $color="#f4a53e">Edit</TempButton>
      </TempButtonContainer>

      <TempButtonContainer>
        <TempButton onClick={selectUp} $color="#3e4df4">Toggle Bold</TempButton>
        <TempButton onClick={selectUp} $color="#3e4df4">Toggle Italic</TempButton>
      </TempButtonContainer>
      
    </TempButtonsAreaBackground>
  );
}

const App = () => {
  return (
    <>
      <Notebook/>
    </>
  );
}

root.render(
  <>
    <GlobalStyle/>
    <ReduxProvider store={store}>
      <TempButtonsArea/>
      <App/>
    </ReduxProvider>
  </>
);
