
import React, { useState, useCallback } from 'react';
import { LEVELS } from './constants';
import type { Level, Topic } from './types';
import { generateBookContent } from './services/geminiService';
import BookModal from './components/BookModal';
import { GridIcon, ListIcon, FlashIcon } from './components/IconComponents';
import MentalChallenges from './components/MentalChallenges';
import GamesChallenge from './components/GamesChallenge';
import LandingPage from './components/LandingPage';

const Header: React.FC = () => (
  <header className="bg-[#1B2135] text-white p-4 rounded-b-2xl shadow-lg">
    <div className="flex flex-col items-center md:flex-row md:justify-center gap-4">
      <div className="flex items-center gap-4">
        <img src="https://raw.githubusercontent.com/Abeerahmedwafa123/Mental-Math-/main/Edu%20Logo%20White.png" alt="Edulixa Logo" className="h-10"/>
        <h1 
          className="font-display text-xl sm:text-2xl text-orange-400" 
          style={{ textShadow: '0 0 5px #f97316, 0 0 10px #f97316' }}
        >
          Where Excellence Meets Creativity
        </h1>
      </div>
    </div>
  </header>
);

interface FilterBarProps {
  onNavigate: (view: 'books' | 'challenges' | 'games') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onNavigate }) => {
    const filters = [
      { name: "Home", view: 'books' as const }, 
      { name: "Games", view: 'games' as const }, 
      { name: "Mental Challenges", view: 'challenges' as const }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {filters.map(filter => (
                <button 
                    key={filter.name} 
                    onClick={() => onNavigate(filter.view)}
                    className="w-full bg-orange-400 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-orange-500 transition-colors flex justify-center items-center text-center"
                >
                    <span>{filter.name}</span>
                </button>
            ))}
        </div>
    );
};

interface BookProps {
  topic: Topic;
  onBookSelect: (topic: Topic) => void;
  glowColor: string;
}

const Book: React.FC<BookProps> = ({ topic, onBookSelect, glowColor }) => {
  const imageUrl = topic.image;
  // Create a unique but valid class name from the topic title
  const uniqueClassName = `book-glow-${topic.title.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div className="flex-shrink-0 px-4 pb-8">
        <style>{`
          @keyframes ${uniqueClassName}-anim {
            0%, 100% {
              box-shadow: 0 0 15px -3px ${glowColor}, 0 0 8px -4px ${glowColor};
            }
            50% {
              box-shadow: 0 0 25px -3px ${glowColor}, 0 0 12px -4px ${glowColor};
            }
          }
          .${uniqueClassName} {
            animation: ${uniqueClassName}-anim 4s ease-in-out infinite;
          }
        `}</style>
        <button 
            onClick={() => onBookSelect(topic)}
            className="relative w-[210px] h-[280px] bg-transparent rounded-lg group transition-all duration-300 ease-out hover:scale-110 hover:-rotate-3 hover:-translate-y-2 hover:z-20"
        >
            <img 
                src={imageUrl} 
                alt={topic.title} 
                className={`w-full h-full object-contain rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-2xl border-2 border-white ${uniqueClassName}`}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 rounded-lg group-hover:bg-opacity-10 transition-all duration-300"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg border-2 border-white transform group-hover:scale-110 transition-transform duration-300">
                e
            </div>
        </button>
    </div>
  );
};

interface BookshelfProps {
  levelData: Level;
  onBookSelect: (topic: Topic) => void;
}

const Bookshelf: React.FC<BookshelfProps> = ({ levelData, onBookSelect }) => {
    const textShadowStyle = {
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
    };

    return (
        <div className="mt-16 mb-8">
            <div className="mb-4 px-1">
                <h2 className="text-4xl font-bold font-display text-white flex items-center gap-3" style={textShadowStyle}>
                    <span className={`${levelData.color} p-2 rounded-full shadow-lg flex-shrink-0`}>
                        <FlashIcon className="w-5 h-5 text-white" />
                    </span>
                    <span>Level {levelData.level}: {levelData.title}</span>
                </h2>
                <p className="text-lg text-slate-100 pl-12 pt-1" style={textShadowStyle}>{levelData.description}</p>
            </div>
            <div className="relative">
                <div className="flex items-end justify-center overflow-x-auto pb-4 -mx-4 px-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style>{`
                        .overflow-x-auto::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {levelData.topics.map(topic => (
                        <Book key={topic.title} topic={topic} onBookSelect={onBookSelect} glowColor={levelData.glowColor} />
                    ))}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-4 rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.5)_inset]" style={{background: 'linear-gradient(to bottom, #8B572A, #6A411F)'}}></div>
                <div className="absolute bottom-[-1.25rem] left-0 right-0 flex justify-evenly">
                    <div className="w-4 h-5 bg-[#4a2e1a] rounded-b-sm shadow-md"></div>
                    <div className="w-4 h-5 bg-[#4a2e1a] rounded-b-sm shadow-md"></div>
                </div>
            </div>
        </div>
    )
};

const Footer: React.FC = () => (
    <footer className="relative bg-[#1B2135] text-white mt-24 pb-4 pt-8">
        <div className="absolute bottom-full left-0 right-0 h-16">
            <div className="h-full w-full bg-[#1B2135]" style={{ borderRadius: '50% / 100%', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center text-sm">
            <div className="flex justify-center items-center flex-wrap gap-x-3 sm:gap-x-4 gap-y-2">
                <a href="#" className="hover:underline">Home</a>
                <span className="opacity-50">|</span>
                <a href="#" className="hover:underline">Reading</a>
                <span className="opacity-50">|</span>
                <a href="#" className="hover:underline">Maths</a>
                <span className="opacity-50">|</span>
                <a href="#" className="hover:underline">Help and Feedback</a>
                <span className="hidden sm:inline opacity-50">|</span>
                <a href="#" className="hover:underline">Privacy Policy</a>
                <span className="opacity-50">|</span>
                <a href="#" className="hover:underline">Legal Notice</a>
                <span className="opacity-50">|</span>
                <a href="#" className="hover:underline">Cookie Policy</a>
            </div>
            <p className="mt-4 text-xs text-gray-400">&copy; Copyright Edulixa {new Date().getFullYear()}</p>
        </div>
    </footer>
);

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [view, setView] = useState<'books' | 'challenges' | 'games'>('books');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [modalContent, setModalContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicSelect = useCallback(async (topic: Topic) => {
    if (topic.title === "Addition Fun") {
      window.open("https://www.canva.com/design/DAG3SQZCDxs/vQrfm-9wlWImC_oS60HZJw/view?utm_content=DAG3SQZCDxs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hca5ff62725", "_blank");
      return;
    }
    if (topic.title === "Subtraction Skills") {
      window.open("https://www.canva.com/design/DAG2_x1ncak/-wCJTgXzpzbb-YSJ0YX1Dg/view?utm_content=DAG2_x1ncak&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h06960a8e54", "_blank");
      return;
    }
    if (topic.title === "Multiplication Mastery") {
      window.open("https://www.canva.com/design/DAG3LVneaKc/c8ty67wDrv7vCILfD_sOZA/view?utm_content=DAG3LVneaKc&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h8db1925d3d", "_blank");
      return;
    }
    if (topic.title === "Division Basics") {
      window.open("https://www.canva.com/design/DAG3Ll8g6QE/rrasGs5QzcbqTx7b1c2BtA/view?utm_content=DAG3Ll8g6QE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4f476edf26", "_blank");
      return;
    }
  
    setSelectedTopic(topic);
    setIsModalOpen(true);
    setIsLoading(true);
    setModalContent('');

    const content = await generateBookContent(topic.title);
    
    setModalContent(content);
    setIsLoading(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
        setSelectedTopic(null);
        setModalContent('');
    }, 300);
  }, []);
  
  const binaryString = Array(100).fill("0110 1001 0111 0100 0010 0101 1001 1010 0101 0010 1011 0101").join(' ');

  const renderContent = () => {
    switch(view) {
      case 'books':
        return (
          <div>
            {LEVELS.map((level) => (
                <Bookshelf key={level.level} levelData={level} onBookSelect={handleTopicSelect} />
            ))}
          </div>
        );
      case 'challenges':
        return <MentalChallenges />;
      case 'games':
        return <GamesChallenge onBack={() => setView('books')} />;
      default:
        return null;
    }
  }

  if (showLanding) {
    return <LandingPage onStart={() => setShowLanding(false)} />;
  }

  return (
    <div className="app-container min-h-screen overflow-x-hidden">
        <style>{`
            .app-container {
                position: relative;
                background-color: #1B2135;
                background-image: radial-gradient(ellipse at 50% 20%, #1CA8A8 0%, #1B2135 60%);
                overflow: hidden;
            }
            .app-container::before {
                content: '${binaryString}';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                color: rgba(255, 255, 255, 0.07);
                font-family: monospace;
                font-size: 1.5vw;
                line-height: 1.8;
                text-align: center;
                word-break: break-all;
                text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5);
                pointer-events: none;
            }
        `}</style>
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <Header />
        <main className="py-4">
            <FilterBar onNavigate={setView} />
            {renderContent()}
        </main>
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
      <BookModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={selectedTopic?.title || ''}
        content={modalContent}
        isLoading={isLoading}
      />
    </div>
  );
}
