import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiSettings, FiAward, FiTrendingUp, FiClock, FiEdit, FiLock, FiHelpCircle, FiInfo } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/slices/authSlice';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const stats = [
    { label: 'Tests Completed', value: '24', icon: FiAward, color: 'blue' },
    { label: 'Total Score', value: '85%', icon: FiTrendingUp, color: 'green' },
    { label: 'Study Time', value: '42h', icon: FiClock, color: 'purple' },
    { label: 'Current Streak', value: '7 days', icon: FiAward, color: 'red' },
  ];

  const recentActivity = [
    { action: 'Completed Mathematics Mock Test', time: '2 hours ago', score: 85 },
    { action: 'Started Physics Chapter 3', time: '5 hours ago', score: null },
    { action: 'Practiced 50 Chemistry Questions', time: '1 day ago', score: 92 },
    { action: 'Completed Biology Quiz', time: '2 days ago', score: 78 },
  ];

  const achievements = [
    { title: '7 Day Streak', description: 'Studied for 7 consecutive days', icon: '🔥' },
    { title: 'Quick Learner', description: 'Completed 10 chapters', icon: '⚡' },
    { title: 'Test Master', description: 'Scored above 90% in 5 tests', icon: '🏆' },
    { title: 'Question Solver', description: 'Answered 500+ questions', icon: '✅' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-lg text-gray-600">View and manage your profile information</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-blue-600">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name || 'Student'}</h2>
              <p className="text-blue-100">{user?.email || 'student@vedai.com'}</p>
              <div className="flex gap-4 mt-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Class 12</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Science Stream</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/profile/edit')}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <FiEdit />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses: Record<string, string> = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            purple: 'bg-purple-50 text-purple-600',
            red: 'bg-red-50 text-red-600',
          };
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className={`w-10 h-10 rounded-lg ${colorClasses[stat.color]} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                {activity.score !== null && (
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">{activity.score}%</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <button
              onClick={() => navigate('/profile/edit')}
              className="w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors text-left flex items-center gap-3"
            >
              <FiEdit />
              Edit Profile
            </button>
            <button
              onClick={() => navigate('/profile/change-password')}
              className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors text-left flex items-center gap-3"
            >
              <FiLock />
              Change Password
            </button>
            <button
              onClick={() => navigate('/profile/progress')}
              className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors text-left flex items-center gap-3"
            >
              <FiTrendingUp />
              View Progress
            </button>
            <button
              onClick={() => navigate('/profile/help')}
              className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors text-left flex items-center gap-3"
            >
              <FiHelpCircle />
              Help Center
            </button>
            <button
              onClick={() => navigate('/profile/about')}
              className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors text-left flex items-center gap-3"
            >
              <FiInfo />
              About VedAI
            </button>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

