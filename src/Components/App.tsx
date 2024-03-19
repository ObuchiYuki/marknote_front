import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../redux/store';
import { Notebook } from '../components/Notebook';
import { useAppDispatch } from '../hooks/useRedux';
import { escapeCell } from '../redux/thunk/cellAction';


const AppContainer = () => {
  const dispatch = useAppDispatch();

  const backgroundClick = () => {
    dispatch(escapeCell())
  }

  return (
    <div onClick={backgroundClick}>
      {/* <TempButtonsArea/> */}
      <Notebook/>
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
