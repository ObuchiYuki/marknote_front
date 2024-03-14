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
  justify-content: center;
  margin-top: 20px;
`

const TempButton = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`

const TempButtonsArea = () => {
  const dispatch = useAppDispatch();

  return (
    <TempButtonsAreaBackground>
      <TempButton onClick={() => dispatch({ type: "addMarkdownCell" })}>Add Markdown</TempButton>
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
