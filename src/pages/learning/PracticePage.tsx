import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTarget, FiTrendingUp, FiClock, FiAward } from 'react-icons/fi';

const PracticePage: React.FC = () => {
  const navigate = useNavigate();
  const practiceCategories = [
    {
      id: '1',
      title: 'Quick Practice',
      description: 'Short practice sessions with 10-15 questions',
      icon: <FiTarget className="w-12 h-12 text-purple-600" />,
      questionsCount: 15,
      duration: 20,
      difficulty: 'Mixed',
      color: 'purple',
    },
    {
      id: '2',
      title: 'Chapter-wise Tests',
      description: 'Practice questions organized by chapters',
      icon: <FiTrendingUp className="w-12 h-12 text-blue-600" />,
      questionsCount: 30,
      duration: 45,
      difficulty: 'Progressive',
      color: 'blue',
    },
    {
      id: '3',
      title: 'Full Mock Tests',
      description: 'Complete exam simulation with timer',
      icon: <FiClock className="w-12 h-12 text-green-600" />,
      questionsCount: 100,
      duration: 180,
      difficulty: 'All Levels',
      color: 'green',
    },
    {
      id: '4',
      title: 'Previous Year Papers',
      description: 'Practice with actual exam questions',
      icon: <FiAward className="w-12 h-12 text-red-600" />,
      questionsCount: 50,
      duration: 90,
      difficulty: 'Hard',
      color: 'red',
    },
  ];

  const recentAttempts = [
    { name: 'Mathematics Mock Test 1', score: 85, date: '2 days ago' },
    { name: 'Physics Quick Practice', score: 92, date: '5 days ago' },
    { name: 'Chemistry Chapter Test', score: 78, date: '1 week ago' },
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      purple: 'bg-purple-50 border-purple-200 hover:border-purple-400',
      blue: 'bg-blue-50 border-blue-200 hover:border-blue-400',
      green: 'bg-green-50 border-green-200 hover:border-green-400',
      red: 'bg-red-50 border-red-200 hover:border-red-400',
    };
    return colors[color] || 'bg-white border-gray-200 hover:border-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Practice Hub</h1>
        <p className="text-lg text-gray-600">Test your knowledge with interactive practice sessions</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Tests Completed</p>
          <p className="text-2xl font-bold text-gray-900">24</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Average Score</p>
          <p className="text-2xl font-bold text-blue-600">85%</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Time Spent</p>
          <p className="text-2xl font-bold text-gray-900">12.5h</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Best Score</p>
          <p className="text-2xl font-bold text-green-600">98%</p>
        </div>
      </div>

      {/* Practice Categories */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Practice Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practiceCategories.map((category) => (
            <div
              key={category.id}
              className={`rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${getColorClass(
                category.color
              )}`}
            >
              {/* Icon */}
              <div className="mb-4">{category.icon}</div>

              {/* Category Info */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{category.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Questions</p>
                  <p className="font-semibold text-gray-900">{category.questionsCount}</p>
                </div>
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-semibold text-gray-900">{category.duration} min</p>
                </div>
                <div>
                  <p className="text-gray-500">Level</p>
                  <p className="font-semibold text-gray-900">{category.difficulty}</p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => navigate(`/practice/test/${category.id}`)}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Start Practice
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Attempts */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Attempts</h2>
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {recentAttempts.map((attempt, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{attempt.name}</h3>
                  <p className="text-sm text-gray-500">{attempt.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">{attempt.score}%</p>
                  <p className="text-xs text-gray-500">Score</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">💡 Performance Tips</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Practice regularly to improve your accuracy and speed</li>
          <li>• Review incorrect answers to understand your mistakes</li>
          <li>• Try different difficulty levels to challenge yourself</li>
          <li>• Take full-length mock tests before exams</li>
        </ul>
      </div>
    </div>
  );
};

export default PracticePage;

