import React from 'react';
import ForgotPasswordForm from '@components/forms/ForgotPasswordForm';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="mt-2 text-gray-600">We'll help you reset it</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

