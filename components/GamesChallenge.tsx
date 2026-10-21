import React, { useState, useMemo } from 'react';
import { PointsIcon, AccuracyIcon } from './IconComponents';
import { LEVEL_1_QUESTIONS, LEVEL_2_QUESTIONS, LEVEL_3_QUESTIONS, Question } from '../questions';

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const selectRandomQuestions = (questions: Question[], count: number) => {
  return shuffleArray(questions).slice(0, count);
};

const StatItem: React.FC<{ icon: React.ReactNode; label: string; color: string }> = ({ icon, label, color }) => (
    <div className="flex flex-col items-center gap-2 w-28 text-center">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg`} style={{backgroundColor: color}}>
        {icon}
      </div>
      <span className="font-bold text-sm uppercase tracking-wider text-gray-200 mt-2 whitespace-nowrap">{label}</span>
    </div>
);

const Confetti: React.FC = () => (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
      {Array.from({ length: 150 }).map((_, i) => {
        const style = {
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 3 + 2}s`,
          animationDelay: `${Math.random() * 5}s`,
          backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        };
        return <div key={i} className="confetti-piece" style={style}></div>;
      })}
    </div>
);

const GamesChallenge: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [playerName, setPlayerName] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [gameOver, setGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState<{ points: number; accuracy: number; resultText: string } | null>(null);

    const gameQuestions = useMemo(() => shuffleArray([
        ...selectRandomQuestions(LEVEL_1_QUESTIONS, 10),
        ...selectRandomQuestions(LEVEL_2_QUESTIONS, 10),
        ...selectRandomQuestions(LEVEL_3_QUESTIONS, 10),
    ]), []);

    const endGame = () => {
        setGameOver(true);
        
        let score = 0;
        gameQuestions.forEach(q => {
            const userAnswer = (answers[q.id] || '').trim().toLowerCase().replace(/\s/g, '');
            const correctAnswer = q.answer.trim().toLowerCase().replace(/\s/g, '');
            if (userAnswer === correctAnswer) {
                score++;
            }
        });

        const accuracy = Math.round((score / gameQuestions.length) * 100);
        
        let resultText = "Great Effort!";
        if (accuracy > 85) resultText = "Math Whiz!";
        else if (accuracy > 60) resultText = "Well Done!";

        setFinalScore({
            points: score,
            accuracy: accuracy,
            resultText: resultText,
        });
    };

    const handleStart = () => {
        if (playerName.trim()) {
            setGameStarted(true);
        } else {
            alert("Please enter your name!");
        }
    };
    
    const handleAnswerChange = (questionId: number, value: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    if (gameOver && finalScore) {
        const isWhiz = finalScore.resultText === 'Math Whiz!';
        return (
            <div className="text-white text-center py-8 relative flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
                {isWhiz && <Confetti />}
                <style>{`
                  @keyframes glow-whiz {
                    0%, 100% { text-shadow: 0 0 10px #f59e0b, 0 0 20px #f59e0b, 0 0 30px #fcd34d; }
                    50% { text-shadow: 0 0 20px #fbbf24, 0 0 30px #fcd34d, 0 0 40px #fcd34d; }
                  }
                  .glowing-text-whiz { color: #fcd34d; animation: glow-whiz 2s ease-in-out infinite; }

                  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                  .animate-fade-in { animation: fade-in 0.5s ease-out; }

                  @keyframes confetti-fall {
                    0% { transform: translateY(-10vh) rotateZ(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotateZ(720deg); opacity: 0; }
                  }
                  .confetti-piece {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    animation: confetti-fall 5s linear infinite;
                  }
                `}</style>
                <h1 className={`font-display text-6xl font-bold mb-8 ${isWhiz ? 'glowing-text-whiz' : 'text-cyan-300'}`}>
                    {finalScore.resultText}
                </h1>
                <div className="flex justify-center items-start gap-4 md:gap-12 my-8 flex-wrap">
                    <StatItem label={`${finalScore.points} POINTS`} icon={<PointsIcon className="w-10 h-10 text-white"/>} color="#f97316" />
                    <StatItem label={`${finalScore.accuracy}% ACCURACY`} icon={<AccuracyIcon className="w-10 h-10 text-white"/>} color="#3b82f6" />
                </div>
                <button onClick={onBack} className="mt-8 bg-orange-400 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-orange-500 transition-colors">
                    Home
                </button>
            </div>
        );
    }
    
    if (!gameStarted) {
        return (
            <div className="text-white text-center py-8 relative flex flex-col items-center justify-center min-h-[80vh]">
                <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider text-cyan-200 mb-8">Mixed Math Challenge</h1>
                <p className="text-gray-300 max-w-md mx-auto">Test your skills with 30 questions from all levels. No timer, just fun!</p>
                <div className="mt-12 w-full max-w-sm">
                    <input 
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Enter your name to start"
                        className="w-full text-center bg-transparent border-2 border-cyan-400 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    />
                    <button onClick={handleStart} className="mt-4 w-full bg-orange-400 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-orange-500 transition-colors">
                        Start Game
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="text-white py-8 relative">
            <div className="sticky top-0 bg-[#1B2135]/80 backdrop-blur-sm z-20 py-4 mb-4">
              <div className="flex justify-between items-center max-w-4xl mx-auto px-4">
                  <h2 className="font-display text-2xl text-cyan-300">{playerName}'s Game</h2>
                  <div className="text-lg text-gray-300">No Time Limit!</div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto px-4 space-y-6">
                {gameQuestions.map((q, index) => (
                    <div key={q.id} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                        <label className="block text-lg text-gray-300 mb-2">
                            <span className="font-bold text-cyan-400 mr-2">Q{index + 1}:</span> 
                            {q.text}
                        </label>
                        <input
                            type="text"
                            value={answers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            className="w-full bg-slate-900 border border-slate-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                ))}
                <button onClick={endGame} className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-emerald-600 transition-colors mt-8">
                    Submit Answers
                </button>
            </div>
        </div>
    );
};

export default GamesChallenge;
