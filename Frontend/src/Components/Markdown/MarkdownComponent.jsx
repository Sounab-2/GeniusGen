import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';

const MarkdownViewer = () => {
  const text = useSelector(state => state.generatedText);

  const components = {
    h2: ({ children }) => <h2 className="text-2xl text-blue-500 font-bold">{children}</h2>,
    h3: ({ children }) => <h2 className="text-2xl text-blue-500 font-bold">{children}</h2>,
  };
  
  return (
    <>
      <ReactMarkdown components={components}>
        {text}
      </ReactMarkdown>
    </>
  );
};

export default MarkdownViewer;
