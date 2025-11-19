import React from 'react';
import { FiTarget } from 'react-icons/fi';

const PracticePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Practice Hub</h1>
        <p className="text-lg text-gray-600">Test your knowledge with interactive practice sessions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Quick Practice', desc: 'Short practice sessions' },
          { title: 'Test Series', desc: 'Full-length mock exams' },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <FiTarget className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
            <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
              Coming Soon
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticePage;

