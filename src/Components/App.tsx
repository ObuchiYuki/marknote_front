import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../redux/store/store';
import { Notebook } from '../components/main/Notebook';
import { useAppDispatch } from '../hooks/useRedux';
import { escapeCell } from '../redux/thunk/cellThunks';
import { TempButtonsArea } from './TempButtonsArea';
import styled from 'styled-components';
import { Sidebar } from './sidebar/Sidebar';

const AppColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  height: 100vh;
`;

const AppContainer = () => {
  const dispatch = useAppDispatch();

  const backgroundClick = () => {
    dispatch(escapeCell())
  }

  return (
    <div onClick={backgroundClick}>
      <TempButtonsArea/>
      
      <AppColumn>
        <Sidebar/>
        <Notebook style={{flexGrow: 1}}/>
      </AppColumn>
    </div>
  );
}

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <AppContainer/>
    </ReduxProvider>
  );
}
