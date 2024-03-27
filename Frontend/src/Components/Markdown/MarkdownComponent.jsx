import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';


const MarkdownViewer = () => {
  const text = useSelector(state => state.generatedText)
    
    return (
      <>
        <ReactMarkdown>{text}</ReactMarkdown>
      </>
    );
  };
  
  export default MarkdownViewer;
