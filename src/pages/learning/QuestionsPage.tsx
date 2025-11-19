import React from 'react';
import { FiHelpCircle } from 'react-icons/fi';

const QuestionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Question Banks</h1>
        <p className="text-lg text-gray-600">Access thousands of practice questions for comprehensive exam prep</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <FiHelpCircle className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Question Bank {i}</h3>
            <p className="text-gray-600 text-sm mb-4">Detailed questions and solutions coming soon</p>
            <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
              Coming Soon
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsPage;

