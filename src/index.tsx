import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './components/GlobalStyle'
import { App } from './components/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <GlobalStyle/>
    <App/>
  </>
);

