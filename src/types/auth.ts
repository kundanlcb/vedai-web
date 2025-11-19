// Authentication-related types

import { ID } from './common';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';

export interface User {
  id: ID;
  email: string;
  name: string;
  profilePicture?: string;
  school?: string;
  class?: string;
  board?: string;
  medium?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  school?: string;
  class?: string;
  board?: string;
  medium?: string;
}

export interface RegisterResponse {
  user: User;
  tokens: AuthTokens;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  resetTokenSent: boolean;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  expiresIn: number;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
  success: boolean;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  status: AuthStatus;
  error: string | null;
  isInitialized: boolean;
}

