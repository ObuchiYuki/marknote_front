import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import styled from 'styled-components';

import { GlobalStyle } from './components/GlobalStyle'
import { MarkdownCell } from './components/MarkdownCell';
import { convertMarkdownToSlide } from './system/convertMarkdownToSlide';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const TempAppContainer = styled.div`
  padding: 20px;
`;

const App = () => {
  const [code, setCode] = useState(
    "# Hello, world!"
  );

  const slide = convertMarkdownToSlide(code);

  return (
    <TempAppContainer>
      <MarkdownCell code={code} setCode={setCode}/>

    </TempAppContainer>
  );
}

root.render(
  <>
    <GlobalStyle/>
    <App/>
  </>
);
