
import React from 'react';
import type { Level, Topic } from '../types';
import { MongizIcon } from './IconComponents';

interface LevelCardProps {
  levelData: Level;
  onTopicSelect: (topic: Topic) => void;
}

const LevelCard: React.FC<LevelCardProps> = ({ levelData, onTopicSelect }) => {
  const { level, title, description, topics, color, bgColor, shelfColor } = levelData;

  return (
    <div className={`rounded-3xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ${bgColor}`}>
      <div className={`p-6 ${color} text-white`}>
        <div className="flex justify-between items-center">
          <h3 className="font-display text-3xl">Level {level}</h3>
          <MongizIcon className="w-12 h-12" />
        </div>
        <h4 className="font-display text-2xl mt-2">{title}</h4>
        <p className="mt-1 text-sm font-light">{description}</p>
      </div>

      <div className="p-6 relative">
        <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t ${shelfColor} opacity-50`}></div>
        <div className="relative z-10">
          <p className="text-gray-600 mb-4 font-semibold">Interactive Books:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topics.map((topic) => (
              <button
                key={topic.title}
                onClick={() => onTopicSelect(topic)}
                className="w-full text-left bg-white p-3 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">{topic.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{topic.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelCard;
