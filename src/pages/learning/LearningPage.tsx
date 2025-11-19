import React from 'react';
import { FiBook } from 'react-icons/fi';

const LearningPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Learning Hub</h1>
        <p className="text-lg text-gray-600">Explore subjects, chapters, and comprehensive learning content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <FiBook className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Subject {i}</h3>
            <p className="text-gray-600 text-sm mb-4">Comprehensive content coming soon</p>
            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
              Coming Soon
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;

