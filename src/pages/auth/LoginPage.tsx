import React from 'react';
import LoginForm from '@components/forms/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your VedAI account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

