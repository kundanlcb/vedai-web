import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { registerUser } from '@store/slices/authSlice';
import type { RegisterRequest } from '../../types/auth';

// Form data type (validation disabled)
type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  school?: string;
  class?: string;
  board?: string;
  medium?: string;
};

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    // Validation disabled for now
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      school: '',
      class: '',
      board: '',
      medium: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setApiError(null);

      const registerPayload: RegisterRequest = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        school: data.school,
        class: data.class,
        board: data.board,
        medium: data.medium,
      };

      const result = await dispatch(registerUser(registerPayload)).unwrap();

      if (result) {
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
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

        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            placeholder="John Doe"
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
              errors.name
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

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
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
              errors.email
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* School Field */}
        <div>
          <label htmlFor="school" className="block text-sm font-medium text-gray-700">
            School (Optional)
          </label>
          <input
            {...register('school')}
            type="text"
            id="school"
            placeholder="Your school name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />
        </div>

        {/* Class Field */}
        <div>
          <label htmlFor="class" className="block text-sm font-medium text-gray-700">
            Class (Optional)
          </label>
          <input
            {...register('class')}
            type="text"
            id="class"
            placeholder="e.g., 10th, 12th"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />
        </div>

        {/* Board Field */}
        <div>
          <label htmlFor="board" className="block text-sm font-medium text-gray-700">
            Board (Optional)
          </label>
          <select
            {...register('board')}
            id="board"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          >
            <option value="">Select Board</option>
            <option value="cbse">CBSE</option>
            <option value="icse">ICSE</option>
            <option value="state">State Board</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Medium Field */}
        <div>
          <label htmlFor="medium" className="block text-sm font-medium text-gray-700">
            Medium (Optional)
          </label>
          <select
            {...register('medium')}
            id="medium"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          >
            <option value="">Select Medium</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="other">Other</option>
          </select>
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
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-blue-600 py-2 px-4 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>

        {/* Sign In Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;

