
import React, { useState } from 'react';
import { PointsIcon, TrophyIcon, AccuracyIcon, StreakIcon } from './IconComponents';
import Level1Challenge from './Level1Challenge';
import Level2Challenge from './Level2Challenge';
import Level3Challenge from './Level3Challenge';
import Level4Challenge from './Level4Challenge';

const StatItem: React.FC<{ icon: React.ReactNode; label: string; color: string }> = ({ icon, label, color }) => (
  <div className="flex flex-col items-center gap-2 w-16 md:w-28 text-center">
    <div className={`w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg`} style={{backgroundColor: color}}>
      {icon}
    </div>
    <span className="font-bold text-[10px] md:text-sm uppercase tracking-wider text-gray-200 mt-2 whitespace-nowrap">{label}</span>
  </div>
);

const AdventureCard: React.FC<{ title: string; image: string; sizeClass: string }> = ({ title, image, sizeClass }) => (
  <div 
    className={`relative ${sizeClass} rounded-xl cursor-pointer transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2 filter drop-shadow-xl hover:drop-shadow-2xl`}
  >
    <img src={image} alt={title} className="w-full h-full object-contain"/>
  </div>
);

const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button 
        onClick={onClick}
        className="absolute top-0 left-0 md:left-4 z-50 flex items-center gap-2 p-2 md:px-4 md:py-2 bg-slate-800/80 hover:bg-slate-700/80 text-cyan-400 rounded-full backdrop-blur-sm transition-all shadow-lg border border-cyan-500/30 font-bold text-sm"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span className="hidden sm:inline">Back to Challenges</span>
    </button>
);

const MentalChallenges = () => {
    const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

    const renderLevel = (LevelComponent: React.FC<{ onBack: () => void }>) => (
        <div className="relative w-full animate-fade-in">
            <BackButton onClick={() => setSelectedLevel(null)} />
            <LevelComponent onBack={() => setSelectedLevel(null)} />
             <style>{`
                  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                  .animate-fade-in { animation: fade-in 0.3s ease-out; }
            `}</style>
        </div>
    );

    if (selectedLevel === 1) return renderLevel(Level1Challenge);
    if (selectedLevel === 2) return renderLevel(Level2Challenge);
    if (selectedLevel === 3) return renderLevel(Level3Challenge);
    if (selectedLevel === 4) return renderLevel(Level4Challenge);

    const statsData = [
      { label: '0 Points', icon: <PointsIcon className="w-6 h-6 md:w-10 md:h-10 text-white"/>, color: '#f97316' },
      { label: 'Levels Done', icon: <TrophyIcon className="w-6 h-6 md:w-10 md:h-10 text-white"/>, color: '#22c55e' },
      { label: '0% Accuracy', icon: <AccuracyIcon className="w-6 h-6 md:w-10 md:h-10 text-white"/>, color: '#3b82f6' },
      { label: '0 Streak', icon: <StreakIcon className="w-6 h-6 md:w-10 md:h-10 text-white"/>, color: '#ef4444' },
    ];
    
    const adventureData = [
      {
        level: 1,
        title: 'Explorers',
        image: 'https://raw.githubusercontent.com/Abeerahmedwafa123/Mental-Math-/main/Level%201%20Explorers%20.png',
      },
      {
        level: 2,
        title: 'Genius',
        image: 'https://raw.githubusercontent.com/Abeerahmedwafa123/Mental-Math-/main/Level%202%20Genius.png',
      },
      {
        level: 3,
        title: 'Masters',
        image: 'https://raw.githubusercontent.com/Abeerahmedwafa123/Mental-Math-/main/Ninjas.png',
      },
      {
        level: 4,
        title: 'Legends',
        image: 'https://raw.githubusercontent.com/Abeerahmedwafa123/Mental-Math-/main/level%204%20final.png',
      },
    ];

    return (
        <div className="text-white text-center py-8 relative">
            <h1 className="font-display text-2xl md:text-5xl font-bold tracking-wider text-cyan-200 px-4 mb-4">
                CHOOSE YOUR MATH ADVENTURE!
            </h1>

            <div className="flex justify-center items-start gap-2 md:gap-12 my-4 md:my-8 relative z-10 flex-wrap px-2">
                {statsData.map((stat, index) => (
                    <StatItem key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 max-w-4xl mx-auto justify-items-center mt-8 relative z-10 px-4">
                {adventureData.map((level, index) => {
                    // Size classes adjusted for 2-column grid to ensure good visibility
                    let sizeClass = "w-36 h-52 sm:w-48 sm:h-64 md:w-56 md:h-72";

                    if (level.level === 4) {
                        // Slightly larger emphasis for final level, but kept within grid bounds
                        sizeClass = "w-40 h-56 sm:w-52 sm:h-72 md:w-60 md:h-80";
                    }

                    return (
                        <button 
                          key={index} 
                          onClick={() => setSelectedLevel(level.level)}
                          className="group"
                        >
                          <AdventureCard title={level.title} image={level.image} sizeClass={sizeClass} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MentalChallenges;
