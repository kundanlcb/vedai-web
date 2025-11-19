import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full opacity-20 -ml-48 -mb-48" />

        {/* Content container */}
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">VedAI</h1>
            <p className="text-gray-600">AI-Powered Learning Platform</p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

