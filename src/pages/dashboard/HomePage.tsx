import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/slices/authSlice';
import DailyGoalCard from '@components/cards/DailyGoalCard';
import SubjectCard from '@components/cards/SubjectCard';
import QuestionBankCard from '@components/cards/QuestionBankCard';

const HomePage: React.FC = () => {
  const user = useSelector(selectUser);

  // Mock data - will be replaced with API calls
  const subjects = [
    {
      id: '1',
      name: 'Mathematics',
      description: 'Algebra, Geometry, Calculus',
      progress: 45,
      chapters: 12,
      color: 'blue' as const,
    },
    {
      id: '2',
      name: 'Physics',
      description: 'Mechanics, Thermodynamics, Optics',
      progress: 30,
      chapters: 10,
      color: 'green' as const,
    },
    {
      id: '3',
      name: 'Chemistry',
      description: 'Organic, Inorganic, Physical',
      progress: 60,
      chapters: 15,
      color: 'purple' as const,
    },
  ];

  const questionBanks = [
    {
      id: '1',
      title: 'JEE Main Practice',
      totalQuestions: 500,
      solved: 250,
      difficulty: 'hard' as const,
    },
    {
      id: '2',
      title: 'NEET Question Bank',
      totalQuestions: 600,
      solved: 180,
      difficulty: 'medium' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'Student'}! 👋
        </h1>
        <p className="text-lg text-gray-600">
          Let's make today a productive learning day!
        </p>
      </div>

      {/* Daily Goal Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Goal</h2>
        <DailyGoalCard
          goalsCompleted={2}
          totalGoals={5}
          timeSpent="2h 30m"
          streak={7}
        />
      </section>

      {/* Subjects Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">My Subjects</h2>
          <a href="/learning" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <SubjectCard key={subject.id} {...subject} />
          ))}
        </div>
      </section>

      {/* Question Banks Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Question Banks</h2>
          <a href="/questions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questionBanks.map((bank) => (
            <QuestionBankCard key={bank.id} {...bank} />
          ))}
        </div>
      </section>

      {/* Quick Stats Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Questions Solved', value: '430', icon: '✓' },
            { label: 'Average Accuracy', value: '78%', icon: '🎯' },
            { label: 'Study Streak', value: '7 days', icon: '🔥' },
            { label: 'Learning Hours', value: '24.5h', icon: '⏱️' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

