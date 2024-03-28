import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';

const MarkdownViewer = () => {
  const text = useSelector(state => state.generatedText);

  const components = {
    h2: ({ children }) => <h2 className="text-2xl text-blue-500 font-bold">{children}</h2>,
    h3: ({ children }) => <h2 className="text-2xl text-blue-500 font-bold">{children}</h2>,
    p: ({ children }) => {
      const paragraphChildren = React.Children.toArray(children);
      return (
        <p>
          {paragraphChildren.map((child, index) => {
            if (child.type === 'strong') {
              return React.cloneElement(child, {
                className: 'text-blue-500',
              });
            }
            return child;
          })}
        </p>
      );
    },
    pre: ({ children }) => <pre className="bg-black w-auto rounded-lg text-green-700 p-10">{children}</pre>,
    
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
