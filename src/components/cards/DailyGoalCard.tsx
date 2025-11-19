import React from 'react';
import { FiTrendingUp, FiCheckCircle, FiClock } from 'react-icons/fi';

interface DailyGoalCardProps {
  goalsCompleted?: number;
  totalGoals?: number;
  timeSpent?: string;
  streak?: number;
}

const DailyGoalCard: React.FC<DailyGoalCardProps> = ({
  goalsCompleted = 2,
  totalGoals = 5,
  timeSpent = '2h 30m',
  streak = 7,
}) => {
  const progress = (goalsCompleted / totalGoals) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-600">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Daily Goal</h3>
        <div className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
          <FiTrendingUp className="w-4 h-4" />
          {streak}d streak
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-semibold text-gray-900">{goalsCompleted}/{totalGoals}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FiCheckCircle className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{goalsCompleted}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FiClock className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Time Spent</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{timeSpent}</p>
        </div>
      </div>
    </div>
  );
};

export default DailyGoalCard;

