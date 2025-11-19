import React from 'react';
import ResetPasswordForm from '@components/forms/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="mt-2 text-gray-600">Enter your new password below</p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;

