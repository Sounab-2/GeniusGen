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
    pre: ({ children }) => <pre className="bg-black flex flex-wrap md:text-lg text-xs rounded-lg text-green-700 p-3 text-left md:p-10 overflow-x-auto">{children}</pre>,
    
  };
  if (!text.trim()) {
    return (
      <div className="h-full  min-h-80 w-full flex justify-center items-center font-extrabold text-white flex-col gap-3">
        <span> <img src="/images/bulb.png" alt="bulb" className=' md:w-32 md:h-32 w-24 h-24' /></span>
        <span className=' md:text-2xl text-xl'>How can I help you today ?</span>
        </div>
    );
  }
  
  return (
    <>
      <ReactMarkdown components={components}>
        {text}
      </ReactMarkdown>
    </>
  );
};

export default MarkdownViewer;
