import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, AuthTokens, LoginRequest, RegisterRequest } from '../../types/auth';
import authService from '../../services/authService';

// Async thunks
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    try {
      const user = authService.getStoredUser();
      const isAuthenticated = authService.isAuthenticated();

      if (user && isAuthenticated) {
        // Try to verify with backend
        try {
          const currentUser = await authService.getCurrentUser();
          return currentUser;
        } catch {
          // Backend verification failed, return stored user
          return user;
        }
      }

      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to initialize auth');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authService.login(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const loginUser = login;

export const register = createAsyncThunk(
  'auth/register',
  async (payload: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authService.register(payload);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const registerUser = register;

export const logout = createAsyncThunk('auth/logout', async () => {
  authService.logout();
  return null;
});

const initialState: AuthState = {
  user: null,
  tokens: null,
  status: 'idle',
  error: null,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.tokens = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Initialize auth
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isInitialized = true;
        if (action.payload) {
          state.user = action.payload;
          state.status = 'authenticated';
        } else {
          state.status = 'unauthenticated';
        }
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.isInitialized = true;
        state.status = 'unauthenticated';
        state.error = action.payload as string;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.status = 'unauthenticated';
        state.user = null;
        state.tokens = null;
        state.error = null;
      });
  },
});

export const { clearError, setTokens } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectAuth = (state: any) => state.auth;
export const selectUser = (state: any) => state.auth.user;
export const selectAuthStatus = (state: any) => state.auth.status;
export const selectAuthError = (state: any) => state.auth.error;
export const selectIsAuthenticated = (state: any) => state.auth.status === 'authenticated';
export const selectIsInitialized = (state: any) => state.auth.isInitialized;


