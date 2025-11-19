// Common types and interfaces used across the application

export type ID = string | number;

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
  hasMore: boolean;
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
  timestamp?: string;
}

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

export interface SelectOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface FilterOption {
  id: string;
  name: string;
  value: any;
  count?: number;
}

export interface SortOption {
  label: string;
  value: string;
}

