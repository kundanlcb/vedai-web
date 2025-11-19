import React from 'react';
import RegisterForm from '@components/forms/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Join VedAI and start learning</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;

