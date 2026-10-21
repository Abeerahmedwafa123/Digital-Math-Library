import React, { useState, useEffect, useRef } from 'react';
import { PointsIcon, TrophyIcon, AccuracyIcon, StreakIcon } from './IconComponents';
import { LEVEL_3_QUESTIONS as questions } from '../questions';

const StatItem: React.FC<{ icon: React.ReactNode; label: string; color: string }> = ({ icon, label, color }) => (
    <div className="flex flex-col items-center gap-2 w-28 text-center">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg`} style={{backgroundColor: color}}>
        {icon}
      </div>
      <span className="font-bold text-sm uppercase tracking-wider text-gray-200 mt-2 whitespace-nowrap">{label}</span>
    </div>
);

const Level3Challenge: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [playerName, setPlayerName] = useState('');
    const [gameStarted, setGameStarted] = useState(false);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [timeLeft, setTimeLeft] = useState(600);
    const [gameOver, setGameOver] = useState(false);
    const [finalScore, setFinalScore] = useState<{ points: number; accuracy: number; resultText: string } | null>(null);
    const timerRef = useRef<number | null>(null);

    const endGame = () => {
        setGameOver(true);
        if (timerRef.current) clearInterval(timerRef.current);
        
        let score = 0;
        questions.forEach(q => {
            const userAnswer = (answers[q.id] || '').trim().toLowerCase().replace(/\s/g, '');
            const correctAnswer = q.answer.trim().toLowerCase().replace(/\s/g, '');
            if (userAnswer === correctAnswer) {
                score++;
            }
        });

        const accuracy = Math.round((score / questions.length) * 100);
        
        setFinalScore({
            points: score,
            accuracy: accuracy,
            resultText: score >= 10 ? 'Outstanding!' : 'Try Again!',
        });
    };

    useEffect(() => {
        if (gameStarted && !gameOver) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        endGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameStarted, gameOver]);

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

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (gameOver && finalScore) {
        const isOutstanding = finalScore.resultText === 'Outstanding!';
        return (
            <div className="text-white text-center py-8 relative flex flex-col items-center justify-center min-h-[80vh] animate-fade-in">
                <style>{`
                  @keyframes glow-good {
                    0%, 100% { text-shadow: 0 0 10px #34d399, 0 0 20px #34d399, 0 0 30px #a7f3d0; }
                    50% { text-shadow: 0 0 20px #6ee7b7, 0 0 30px #a7f3d0, 0 0 40px #a7f3d0; }
                  }
                  .glowing-text-good { color: #6ee7b7; animation: glow-good 2s ease-in-out infinite; }
                  
                  @keyframes glow-bad {
                    0%, 100% { text-shadow: 0 0 10px #ef4444, 0 0 20px #ef4444, 0 0 30px #fca5a5; }
                    50% { text-shadow: 0 0 20px #dc2626, 0 0 30px #fca5a5, 0 0 40px #fca5a5; }
                  }
                  .glowing-text-bad { color: #facc15; animation: glow-bad 2s ease-in-out infinite; }
                  
                  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                  .animate-fade-in { animation: fade-in 0.5s ease-out; }
                `}</style>
                <h1 className={`font-display text-6xl font-bold mb-8 ${isOutstanding ? 'glowing-text-good' : 'glowing-text-bad'}`}>
                    {finalScore.resultText}
                </h1>
                <div className="flex justify-center items-start gap-4 md:gap-12 my-8 flex-wrap">
                    <StatItem label={`${finalScore.points} POINTS`} icon={<PointsIcon className="w-10 h-10 text-white"/>} color="#f97316" />
                    <StatItem label="3 LEVELS COMPLETED" icon={<TrophyIcon className="w-10 h-10 text-white"/>} color="#22c55e" />
                    <StatItem label={`${finalScore.accuracy}% ACCURACY`} icon={<AccuracyIcon className="w-10 h-10 text-white"/>} color="#3b82f6" />
                    <StatItem label={`${finalScore.points} STREAK`} icon={<StreakIcon className="w-10 h-10 text-white"/>} color="#ef4444" />
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
                <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wider text-cyan-200 mb-8">Level 3 Challenge</h1>
                <div className="flex justify-center items-start gap-4 md:gap-12 my-8 flex-wrap opacity-50">
                    <StatItem label="0 Points" icon={<PointsIcon className="w-10 h-10 text-white"/>} color="#f97316" />
                    <StatItem label="Levels Completed" icon={<TrophyIcon className="w-10 h-10 text-white"/>} color="#22c55e" />
                    <StatItem label="0% Accuracy" icon={<AccuracyIcon className="w-10 h-10 text-white"/>} color="#3b82f6" />
                    <StatItem label="0 Streak" icon={<StreakIcon className="w-10 h-10 text-white"/>} color="#ef4444" />
                </div>
                <div className="mt-8 w-full max-w-sm">
                    <input 
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Enter your name to start"
                        className="w-full text-center bg-transparent border-2 border-cyan-400 text-white placeholder-gray-400 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-cyan-300"
                    />
                    <button onClick={handleStart} className="mt-4 w-full bg-orange-400 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-orange-500 transition-colors">
                        Start Challenge
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="text-white py-8 relative">
            <div className="sticky top-0 bg-[#1B2135]/80 backdrop-blur-sm z-20 py-4 mb-4">
              <div className="flex justify-between items-center max-w-4xl mx-auto px-4">
                  <h2 className="font-display text-2xl text-cyan-300">{playerName}'s Challenge</h2>
                  <div className="font-mono text-3xl bg-gray-900/50 text-orange-400 rounded-lg px-4 py-1 border border-gray-600">
                      {formatTime(timeLeft)}
                  </div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto px-4 space-y-6">
                {questions.map((q, index) => (
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

export default Level3Challenge;
