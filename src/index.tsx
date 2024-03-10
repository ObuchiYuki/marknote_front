import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './Components/GlobalStyle'
import { useMarkdownEditor } from './Hooks/useMarkdownEditor';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const MyEditor = () => {
  const [code, setCode] = useState(
    `function add(a, b) {\n  return a + b;\n}`
  );

  const { editor } = useMarkdownEditor({
    doc: code,
    setDoc: setCode
  });

  return (
    <div ref={editor} />
  );
};

root.render(
  <>
    <GlobalStyle/>
    <h1>Hello React</h1>
    <MyEditor/>
  </>
);
