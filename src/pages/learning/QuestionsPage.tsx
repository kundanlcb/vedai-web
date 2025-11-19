import React, { useEffect, useState } from 'react';
import { FiHelpCircle, FiSearch, FiFilter, FiBookOpen } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import {
  fetchQuestionBanks,
  selectQuestionBanks,
  selectQuestionsLoading,
} from '../../store/slices/questionsSlice';

const QuestionsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const questionBanks = useAppSelector(selectQuestionBanks);
  const loading = useAppSelector(selectQuestionsLoading);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch question banks for a default subject (Math)
    dispatch(fetchQuestionBanks('1'));
  }, [dispatch]);

  const filteredBanks = questionBanks.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && questionBanks.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading question banks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Question Banks</h1>
        <p className="text-lg text-gray-600">
          Access thousands of practice questions for comprehensive exam prep
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search question banks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <FiFilter />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Question Banks Grid */}
      {filteredBanks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <FiHelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No question banks found</h3>
          <p className="text-gray-500">Try adjusting your search</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBanks.map((bank) => (
            <div
              key={bank.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-400 transition-all cursor-pointer"
            >
              {/* Icon and Difficulty */}
              <div className="flex items-start justify-between mb-4">
                <FiBookOpen className="w-10 h-10 text-green-600" />
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                    bank.difficulty
                  )}`}
                >
                  {bank.difficulty.toUpperCase()}
                </span>
              </div>

              {/* Bank Info */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{bank.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {bank.description || 'No description available'}
              </p>

              {/* Stats */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Questions</span>
                  <span className="font-semibold text-gray-900">{bank.questionsCount}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                Start Practice
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-900">Questions Attempted</h3>
            <FiHelpCircle className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-900">245</p>
          <p className="text-xs text-blue-700 mt-1">+12 this week</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-green-900">Correct Answers</h3>
            <FiHelpCircle className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-900">198</p>
          <p className="text-xs text-green-700 mt-1">80.8% accuracy</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-purple-900">Study Streak</h3>
            <FiHelpCircle className="text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-900">7 days</p>
          <p className="text-xs text-purple-700 mt-1">Keep it up!</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionsPage;

