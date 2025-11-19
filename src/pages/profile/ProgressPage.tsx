import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiTrendingUp, FiBook, FiClock, FiAward, FiTarget } from 'react-icons/fi';

const ProgressPage: React.FC = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: 'Mathematics', progress: 75, chapters: 12, completed: 9, color: 'blue' },
    { name: 'Physics', progress: 60, chapters: 10, completed: 6, color: 'purple' },
    { name: 'Chemistry', progress: 85, chapters: 11, completed: 9, color: 'green' },
    { name: 'Biology', progress: 45, chapters: 8, completed: 4, color: 'red' },
  ];

  const weeklyActivity = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 75 },
    { day: 'Fri', minutes: 90 },
    { day: 'Sat', minutes: 120 },
    { day: 'Sun', minutes: 105 },
  ];

  const achievements = [
    { title: '7 Day Streak', icon: '🔥', unlocked: true },
    { title: 'Chapter Master', icon: '📚', unlocked: true },
    { title: 'Quick Learner', icon: '⚡', unlocked: true },
    { title: 'Test Champion', icon: '🏆', unlocked: false },
    { title: '100 Questions', icon: '✅', unlocked: true },
    { title: 'Perfect Score', icon: '💯', unlocked: false },
  ];

  const stats = [
    { label: 'Total Study Time', value: '42h 30m', icon: FiClock, color: 'blue' },
    { label: 'Chapters Completed', value: '28/41', icon: FiBook, color: 'green' },
    { label: 'Questions Solved', value: '245', icon: FiTarget, color: 'purple' },
    { label: 'Average Score', value: '85%', icon: FiTrendingUp, color: 'red' },
  ];

  const maxMinutes = Math.max(...weeklyActivity.map(d => d.minutes));

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/profile')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FiArrowLeft />
        <span>Back to Profile</span>
      </button>

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Progress</h1>
        <p className="text-lg text-gray-600">Track your learning journey and achievements</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            red: 'bg-red-50 text-red-600',
          };
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className={`w-12 h-12 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]} flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Weekly Activity</h2>
        <div className="flex items-end justify-between gap-2 h-64">
          {weeklyActivity.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col justify-end items-center flex-1">
                <div
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500 relative group"
                  style={{ height: `${(day.minutes / maxMinutes) * 100}%`, minHeight: '20px' }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {day.minutes} min
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600">{day.day}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Total this week: <span className="font-semibold text-gray-900">
              {weeklyActivity.reduce((sum, day) => sum + day.minutes, 0)} minutes
            </span>
          </p>
        </div>
      </div>

      {/* Subject-wise Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Subject-wise Progress</h2>
        <div className="space-y-6">
          {subjects.map((subject, index) => {
            const colorClasses = {
              blue: 'bg-blue-600',
              purple: 'bg-purple-600',
              green: 'bg-green-600',
              red: 'bg-red-600',
            };
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                    <span className="text-sm text-gray-600">
                      {subject.completed}/{subject.chapters} chapters
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">{subject.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${colorClasses[subject.color as keyof typeof colorClasses]}`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <FiAward className="text-yellow-600 w-6 h-6" />
          <h2 className="text-xl font-bold text-gray-900">Achievements</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 hover:shadow-md'
                  : 'bg-gray-50 border-gray-200 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <p className={`text-sm font-semibold ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                {achievement.title}
              </p>
              {achievement.unlocked && (
                <div className="mt-2">
                  <FiAward className="w-4 h-4 text-yellow-600 mx-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Insights</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💪</span>
            <div>
              <p className="font-semibold text-gray-900">Strong Areas</p>
              <p className="text-sm text-gray-700">Chemistry and Mathematics are your best subjects</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">📈</span>
            <div>
              <p className="font-semibold text-gray-900">Need Improvement</p>
              <p className="text-sm text-gray-700">Focus more on Biology to catch up with other subjects</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <p className="font-semibold text-gray-900">Recommendation</p>
              <p className="text-sm text-gray-700">
                Try to maintain consistency with at least 60 minutes of study daily
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
