import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHelpCircle } from 'react-icons/fi';

interface QuestionBankCardProps {
  id: string;
  title: string;
  description?: string;
  totalQuestions: number;
  solved?: number;
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
}

const QuestionBankCard: React.FC<QuestionBankCardProps> = ({
  id,
  title,
  description,
  totalQuestions,
  solved = 0,
  difficulty = 'mixed',
}) => {
  const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
    mixed: 'bg-blue-100 text-blue-700',
  };

  const progressPercentage = totalQuestions > 0 ? (solved / totalQuestions) * 100 : 0;

  return (
    <Link to={`/questions/${id}`}>
      <div className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer transition-all hover:shadow-md hover:border-blue-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
            {description && (
              <p className="text-sm text-gray-600">{description}</p>
            )}
          </div>
          <FiHelpCircle className="w-8 h-8 text-blue-600 ml-2" />
        </div>

        {/* Difficulty Badge */}
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-600 mb-1">Total Questions</p>
            <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Solved</p>
            <p className="text-2xl font-bold text-blue-600">{solved}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">{progressPercentage.toFixed(0)}% Complete</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-600">
            {totalQuestions - solved} remaining
          </span>
          <FiArrowRight className="w-4 h-4 text-blue-600" />
        </div>
      </div>
    </Link>
  );
};

export default QuestionBankCard;

