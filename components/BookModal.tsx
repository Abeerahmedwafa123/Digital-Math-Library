
import React, { useEffect, useRef } from 'react';
import { CloseIcon, MongizIcon } from './IconComponents';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  isLoading: boolean;
}

// A simple markdown to HTML converter for basic formatting
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    const renderContent = () => {
        return content
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map((line, index) => {
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="font-display text-3xl text-emerald-600 mb-4">{line.substring(3)}</h2>;
                }
                if (line.startsWith('> ')) {
                    return <blockquote key={index} className="border-l-4 border-emerald-300 pl-4 my-4 bg-emerald-50 p-4 rounded-r-lg">{line.substring(2)}</blockquote>;
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                    return <p key={index} className="my-2"><strong>{line.substring(2, line.length - 2)}</strong></p>;
                }
                 if (line.includes('**')) {
                     const parts = line.split('**');
                     return <p key={index} className="my-2">{parts.map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part)}</p>
                 }
                return <p key={index} className="my-2 text-gray-700 leading-relaxed">{line}</p>;
            }).reduce((acc, elem) => <>{acc}{elem}</>, <></>);
    };

    return <div className="prose max-w-none">{renderContent()}</div>;
};

const BookModal: React.FC<BookModalProps> = ({ isOpen, onClose, title, content, isLoading }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (modalRef.current && e.target === modalRef.current) {
          onClose();
      }
  };

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform animate-slide-up">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors mr-1"
                aria-label="Back"
                title="Back"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                 </svg>
            </button>
            <MongizIcon className="w-8 h-8"/>
            <h3 className="text-xl font-bold text-gray-800">{isLoading ? "Loading..." : `Mongiz Explains: ${title}`}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                <MongizIcon className="w-24 h-24 animate-bounce"/>
                <p className="mt-4 text-lg text-gray-600 font-semibold">Mongiz is thinking...</p>
                <p className="text-gray-500">Crafting a fun lesson just for you!</p>
            </div>
          ) : (
            <MarkdownRenderer content={content} />
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
            <button 
                onClick={onClose}
                className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75"
            >
                Got it!
            </button>
        </div>
      </div>
       <style>{`
          @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
          
          @keyframes slide-up {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default BookModal;
