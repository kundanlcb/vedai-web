import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { loginUser } from '@store/slices/authSlice';
import type { LoginRequest } from '../../types/auth';

// Form data type (validation disabled)
type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    // Validation disabled for now
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });


  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);

      const loginPayload: LoginRequest = {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe || false,
      };

      const result = await dispatch(loginUser(loginPayload)).unwrap();

      if (result) {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      setApiError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* API Error Message */}
        {apiError && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">{apiError}</p>
          </div>
        )}

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            placeholder="you@example.com"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            {...register('password')}
            type="password"
            id="password"
            placeholder="••••••••"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            {...register('rememberMe')}
            type="checkbox"
            id="rememberMe"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 py-2 px-4 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

