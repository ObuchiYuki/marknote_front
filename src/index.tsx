import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import styled from 'styled-components';

import { GlobalStyle } from './components/GlobalStyle'
import { MarkdownCell } from './components/MarkdownCell';
import { SlideCell } from './components/SlideCell';
import { convertMarkdownToSlide } from './reducers/convertMarkdownToSlide';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const TempAppContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const App = () => {
  const [code, setCode] = useState(
    "# Hello, world!"
  );

  const slide = convertMarkdownToSlide(code);

  return (
    <TempAppContainer>
      <MarkdownCell code={code} setCode={setCode}/>
      <SlideCell slide={slide}/>

    </TempAppContainer>
  );
}

root.render(
  <>
    <GlobalStyle/>
    <App/>
  </>
);
