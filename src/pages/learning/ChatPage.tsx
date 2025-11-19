import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';

const ChatPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Chat Assistant</h1>
        <p className="text-lg text-gray-600">Get instant answers to your study questions with our AI tutor</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
        <FiMessageCircle className="w-16 h-16 text-blue-600 mb-4 mx-auto" />
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Chat Coming Soon</h3>
        <p className="text-gray-600 mb-6">AI-powered learning assistant with instant support for all your study questions</p>
        <button className="px-6 py-3 bg-blue-100 text-blue-600 rounded-lg font-medium hover:bg-blue-200 transition-colors">
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default ChatPage;

