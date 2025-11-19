import apiClient from './api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  User,
  AuthTokens,
} from '../types/auth';

// Constants
const STORAGE_KEY_USER = 'vedai_user';
const STORAGE_KEY_TOKENS = 'vedai_auth_tokens';
const TOKEN_REFRESH_THRESHOLD = 60 * 1000; // Refresh token 1 minute before expiry

// Custom error types
export class AuthError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

class AuthService {
  private refreshTokenPromise: Promise<AuthTokens> | null = null;
  private tokenRefreshTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * Login with email and password
   */
  async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      // Production: Use real API
      // const response = await apiClient.post<LoginResponse>('/auth/login', payload);

      // Development: Mock login
      const now = new Date().toISOString();
      const mockUser: User = {
        id: '1',
        email: payload.email,
        name: payload.email.split('@')[0],
        school: 'Demo School',
        class: '12',
        board: 'CBSE',
        medium: 'English',
        createdAt: now,
        updatedAt: now,
      };

      const mockTokens: AuthTokens = {
        accessToken: 'mock_access_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresIn: 3600,
      };

      const response: LoginResponse = {
        user: mockUser,
        tokens: mockTokens,
      };

      this.storeTokens(response.tokens);
      this.storeUser(response.user);
      this.scheduleTokenRefresh(response.tokens.expiresIn);

      return response;
    } catch (error) {
      throw this.handleError(error, 'LOGIN_FAILED');
    }
  }

  /**
   * Register a new user
   */
  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    try {
      // Production: Use real API
      // const response = await apiClient.post<RegisterResponse>('/auth/register', payload);

      // Development: Mock registration
      const now = new Date().toISOString();
      const mockUser: User = {
        id: '1',
        email: payload.email,
        name: payload.name,
        school: payload.school || 'Not provided',
        class: payload.class || 'Not provided',
        board: payload.board || 'Not provided',
        medium: payload.medium || 'Not provided',
        createdAt: now,
        updatedAt: now,
      };

      const mockTokens: AuthTokens = {
        accessToken: 'mock_access_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now(),
        expiresIn: 3600,
      };

      const response: RegisterResponse = {
        user: mockUser,
        tokens: mockTokens,
      };

      this.storeTokens(response.tokens);
      this.storeUser(response.user);
      this.scheduleTokenRefresh(response.tokens.expiresIn);

      return response;
    } catch (error) {
      throw this.handleError(error, 'REGISTRATION_FAILED');
    }
  }

  /**
   * Request password reset
   */
  async forgotPassword(_payload: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    try {
      // Production: Use real API
      // const response = await apiClient.post<ForgotPasswordResponse>('/auth/forgot-password', payload);

      // Development: Mock
      return {
        message: 'Password reset email sent successfully',
        resetTokenSent: true,
      };
    } catch (error) {
      throw this.handleError(error, 'FORGOT_PASSWORD_FAILED');
    }
  }

  /**
   * Reset password with token
   */
  async resetPassword(_payload: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    try {
      // Production: Use real API
      // const response = await apiClient.post<ResetPasswordResponse>('/auth/reset-password', payload);

      // Development: Mock
      return {
        message: 'Password reset successfully',
        success: true,
      };
    } catch (error) {
      throw this.handleError(error, 'RESET_PASSWORD_FAILED');
    }
  }

  /**
   * Change password (authenticated user)
   */
  // eslint-disable-next-line
  async changePassword(_payload: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    try {
      // Production: Use real API
      // const response = await apiClient.post<ChangePasswordResponse>('/auth/change-password', payload);

      // Development: Mock
      return {
        message: 'Password changed successfully',
        success: true,
      };
    } catch (error) {
      throw this.handleError(error, 'CHANGE_PASSWORD_FAILED');
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<AuthTokens> {
    // Prevent multiple simultaneous refresh requests
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    try {
      const tokens = this.getStoredTokens();
      if (!tokens || !tokens.refreshToken) {
        this.logout();
        throw new AuthError('NO_REFRESH_TOKEN', 'No refresh token available');
      }

      this.refreshTokenPromise = this.performTokenRefresh(tokens);
      const newTokens = await this.refreshTokenPromise;

      this.storeTokens(newTokens);
      apiClient.setTokens(newTokens);
      this.scheduleTokenRefresh(newTokens.expiresIn);

      return newTokens;
    } catch (error) {
      this.logout();
      throw this.handleError(error, 'TOKEN_REFRESH_FAILED');
    } finally {
      this.refreshTokenPromise = null;
    }
  }

  /**
   * Perform actual token refresh (can be overridden for production)
   */
  private async performTokenRefresh(tokens: AuthTokens): Promise<AuthTokens> {
    // Production: Use real API
    // const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh-token', {
    //   refreshToken: tokens.refreshToken,
    // });

    // Development: Mock token refresh
    return {
      accessToken: 'mock_access_token_' + Date.now(),
      refreshToken: tokens.refreshToken || 'mock_refresh_token_' + Date.now(),
      expiresIn: 3600,
    };
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<User> {
    const storedUser = this.getStoredUser();
    if (storedUser) {
      return storedUser;
    }
    // Production: Fetch from API
    // const response = await apiClient.get<User>('/auth/me');

    // Development: Return default user
    throw new AuthError('NO_USER', 'No user found');
  }

  /**
   * Verify session is still valid
   */
  // eslint-disable-next-line
  async verifySession(): Promise<boolean> {
    try {
      const tokens = this.getStoredTokens();
      if (!tokens) return false;

      // Check if token is expired
      if (this.isTokenExpired(tokens)) {
        try {
          await this.refreshToken();
          return true;
        } catch {
          return false;
        }
      }

      return true;
    } catch {
      return false;
    }
  }

  /**
   * Logout user and clear all stored data
   */
  logout(): void {
    this.clearTokenRefreshTimeout();
    apiClient.clearTokens();
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.removeItem(STORAGE_KEY_TOKENS);
  }

  /**
   * Get stored user from localStorage
   */
  getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem(STORAGE_KEY_USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  /**
   * Get stored tokens from localStorage
   */
  getStoredTokens(): AuthTokens | null {
    try {
      const tokensStr = localStorage.getItem(STORAGE_KEY_TOKENS);
      return tokensStr ? JSON.parse(tokensStr) : null;
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    try {
      const tokens = this.getStoredTokens();
      if (!tokens?.accessToken) return false;

      // Check if token is not expired
      return !this.isTokenExpired(tokens);
    } catch {
      return false;
    }
  }

  /**
   * Check if token is expired
   */
  private isTokenExpired(tokens: AuthTokens): boolean {
    if (!tokens.expiresIn) return false;

    const tokenTime = parseInt(localStorage.getItem('vedai_token_time') || '0');
    const now = Date.now();
    const elapsed = now - tokenTime;

    return elapsed > tokens.expiresIn * 1000;
  }

  /**
   * Store tokens in localStorage and API client
   */
  private storeTokens(tokens: AuthTokens): void {
    localStorage.setItem(STORAGE_KEY_TOKENS, JSON.stringify(tokens));
    localStorage.setItem('vedai_token_time', Date.now().toString());
    apiClient.setTokens(tokens);
  }

  /**
   * Store user in localStorage
   */
  private storeUser(user: User): void {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  }

  /**
   * Schedule automatic token refresh
   */
  private scheduleTokenRefresh(expiresIn: number): void {
    this.clearTokenRefreshTimeout();

    const refreshIn = Math.max(0, expiresIn * 1000 - TOKEN_REFRESH_THRESHOLD);

    this.tokenRefreshTimeout = setTimeout(() => {
      this.refreshToken().catch((error) => {
        console.error('Automatic token refresh failed:', error);
      });
    }, refreshIn);
  }

  /**
   * Clear token refresh timeout
   */
  private clearTokenRefreshTimeout(): void {
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
      this.tokenRefreshTimeout = null;
    }
  }

  /**
   * Handle errors in a consistent way
   */
  private handleError(error: unknown, code: string): AuthError {
    if (error instanceof AuthError) {
      return error;
    }

    if (error instanceof Error) {
      return new AuthError(code, error.message);
    }

    return new AuthError(code, 'An unexpected error occurred');
  }

  /**
   * Get error message from error object
   */
  getErrorMessage(error: unknown): string {
    if (error instanceof AuthError) {
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred';
  }
}

export default new AuthService();

