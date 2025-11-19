import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { initializeAuth } from '@store/slices/authSlice';
import ProtectedRoute from '@components/ProtectedRoute';
import AuthLayout from '@components/layouts/AuthLayout';
import DashboardLayout from '@components/layouts/DashboardLayout';

// Lazy load all pages
const LoginPage = React.lazy(() => import('@pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('@pages/auth/RegisterPage'));
const ForgotPasswordPage = React.lazy(() => import('@pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('@pages/auth/ResetPasswordPage'));

const HomePage = React.lazy(() => import('@pages/dashboard/HomePage'));
const LearningPage = React.lazy(() => import('@pages/learning/LearningPage'));
const QuestionsPage = React.lazy(() => import('@pages/learning/QuestionsPage'));
const PracticePage = React.lazy(() => import('@pages/learning/PracticePage'));
const ChatPage = React.lazy(() => import('@pages/learning/ChatPage'));
const ProfilePage = React.lazy(() => import('@pages/learning/ProfilePage'));
const NotFoundPage = React.lazy(() => import('@pages/NotFoundPage'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const dispatch = useAppDispatch();

  // Initialize auth on app load
  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<React.Suspense fallback={<LoadingFallback />}><LoginPage /></React.Suspense>} />
          <Route path="/register" element={<React.Suspense fallback={<LoadingFallback />}><RegisterPage /></React.Suspense>} />
          <Route path="/forgot-password" element={<React.Suspense fallback={<LoadingFallback />}><ForgotPasswordPage /></React.Suspense>} />
          <Route path="/reset-password/:token" element={<React.Suspense fallback={<LoadingFallback />}><ResetPasswordPage /></React.Suspense>} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={
                  <React.Suspense fallback={<LoadingFallback />}>
                    <HomePage />
                  </React.Suspense>
                }
              />
            }
          />

          {/* Learning Routes */}
          <Route
            path="/learning"
            element={
              <ProtectedRoute
                element={
                  <React.Suspense fallback={<LoadingFallback />}>
                    <LearningPage />
                  </React.Suspense>
                }
              />
            }
          />

          {/* Question Bank Routes */}
          <Route
            path="/questions"
            element={
              <ProtectedRoute
                element={
                  <React.Suspense fallback={<LoadingFallback />}>
                    <QuestionsPage />
                  </React.Suspense>
                }
              />
            }
          />

          {/* Practice Routes */}
          <Route
            path="/practice"
            element={
              <ProtectedRoute
                element={
                  <React.Suspense fallback={<LoadingFallback />}>
                    <PracticePage />
                  </React.Suspense>
                }
              />
            }
          />

          {/* Chat Routes */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute
                element={
                  <React.Suspense fallback={<LoadingFallback />}>
                    <ChatPage />
                  </React.Suspense>
                }
              />
            }
          />

          {/* Profile Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={
                  <React.Suspense fallback={<LoadingFallback />}>
                    <ProfilePage />
                  </React.Suspense>
                }
              />
            }
          />
        </Route>

        {/* Catch all - Not Found */}
        <Route path="*" element={<React.Suspense fallback={<LoadingFallback />}><NotFoundPage /></React.Suspense>} />
      </Routes>
    </Router>
  );
};

export default App;

