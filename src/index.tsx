import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import styled from 'styled-components';

import { GlobalStyle } from './components/GlobalStyle'
import { MarkdownCell } from './components/MarkdownCell';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <GlobalStyle/>
    <h1>Hello Markdown</h1>
    <MarkdownCell/>
  </>
);
