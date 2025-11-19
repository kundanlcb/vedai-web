import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import type { AuthTokens } from '../types/auth';
import type { ApiResponse, ErrorResponse } from '../types/common';

// Extend Axios config to include custom properties
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

class ApiClient {
  private instance: AxiosInstance;
  private baseURL: string;
  private tokenRefreshPromise: Promise<string> | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.instance = axios.create({
      baseURL,
      timeout: parseInt(import.meta.env.VITE_API_TIMEOUT as string) || 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const tokens = this.getTokens();
        if (tokens?.accessToken) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const config = error.config as CustomAxiosRequestConfig;

        // Handle 401 Unauthorized - try to refresh token
        if (error.response?.status === 401 && !config?._retry) {
          config._retry = true;

          try {
            const newAccessToken = await this.refreshAccessToken();
            if (config.headers) {
              config.headers.Authorization = `Bearer ${newAccessToken}`;
            }
            return this.instance(config);
          } catch (refreshError) {
            // Refresh failed, logout user
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        // Handle other errors
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Get stored tokens from localStorage
   */
  private getTokens(): AuthTokens | null {
    try {
      const tokensStr = localStorage.getItem('auth_tokens');
      return tokensStr ? JSON.parse(tokensStr) : null;
    } catch {
      return null;
    }
  }

  /**
   * Store tokens in localStorage
   */
  setTokens(tokens: AuthTokens): void {
    localStorage.setItem('auth_tokens', JSON.stringify(tokens));
  }

  /**
   * Clear tokens from localStorage
   */
  clearTokens(): void {
    localStorage.removeItem('auth_tokens');
  }

  /**
   * Refresh access token using refresh token
   */
  private async refreshAccessToken(): Promise<string> {
    // Prevent multiple simultaneous refresh requests
    if (this.tokenRefreshPromise) {
      return this.tokenRefreshPromise;
    }

    this.tokenRefreshPromise = (async () => {
      const tokens = this.getTokens();
      if (!tokens?.refreshToken) {
        throw new Error('No refresh token available');
      }

      try {
        const response = await axios.post<ApiResponse<{ accessToken: string }>>(
          `${this.baseURL}/auth/refresh`,
          { refreshToken: tokens.refreshToken }
        );

        const newAccessToken = response.data.data?.accessToken;
        if (!newAccessToken) {
          throw new Error('No access token in refresh response');
        }

        // Update tokens
        const updatedTokens = {
          ...tokens,
          accessToken: newAccessToken,
        };
        this.setTokens(updatedTokens);

        return newAccessToken;
      } finally {
        this.tokenRefreshPromise = null;
      }
    })();

    return this.tokenRefreshPromise;
  }

  /**
   * Handle and format error responses
   */
  private handleError(error: AxiosError): ErrorResponse {
    if (error.response) {
      const data = error.response.data as any;
      return {
        message: data?.message || 'An error occurred',
        statusCode: error.response.status,
        errors: data?.errors,
        timestamp: new Date().toISOString(),
      };
    }

    if (error.request) {
      return {
        message: 'No response from server',
        statusCode: 0,
        timestamp: new Date().toISOString(),
      };
    }

    return {
      message: error.message || 'An unexpected error occurred',
      statusCode: 0,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * GET request
   */
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

// Create and export the API client instance
const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL as string);

export default apiClient;

