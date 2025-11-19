import { useAppDispatch, useAppSelector } from './useAppDispatch';
import {
  selectUser,
  selectAuthStatus,
  selectIsAuthenticated,
  selectAuthError,
  selectIsInitialized,
  loginUser,
  registerUser,
  logout,
  clearError,
} from '@store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectAuthStatus);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const error = useAppSelector(selectAuthError);
  const isInitialized = useAppSelector(selectIsInitialized);

  return {
    user,
    status,
    isAuthenticated,
    error,
    isInitialized,
    login: (payload: any) => dispatch(loginUser(payload)),
    register: (payload: any) => dispatch(registerUser(payload)),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
  };
};

