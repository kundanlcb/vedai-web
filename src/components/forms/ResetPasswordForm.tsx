import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useParams, useNavigate, Link } from 'react-router-dom';
import authService from '@services/authService';

// Validation schema
const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);
      setSuccessMessage(null);

      if (!token) {
        setApiError('Invalid reset token');
        return;
      }

      await authService.resetPassword({
        token,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      });

      setSuccessMessage('Password reset successfully! Redirecting to login...');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reset password. Please try again.';
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="w-full max-w-md rounded-md bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-800">Invalid Reset Link</h2>
        <p className="mt-2 text-sm text-red-700">
          The password reset link is invalid or has expired.
        </p>
        <Link
          to="/forgot-password"
          className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* API Error Message */}
        {apiError && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{apiError}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="rounded-md bg-green-50 p-4">
            <p className="text-sm font-medium text-green-800">{successMessage}</p>
          </div>
        )}

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            placeholder="••••••••"
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
              errors.password
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
              errors.confirmPassword
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Info Text */}
        <p className="text-sm text-gray-600">
          Enter a new password for your account. Make sure it's at least 6 characters long.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || successMessage !== null}
          className="w-full rounded-md bg-blue-600 py-2 px-4 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>

        {/* Back to Login Link */}
        {!successMessage && (
          <p className="text-center text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
              Back to login
            </Link>
          </p>
        )}
      </form>
    </div>
  );
};

export default ResetPasswordForm;

