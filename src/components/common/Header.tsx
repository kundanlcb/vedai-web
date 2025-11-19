import React, { useState } from 'react';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/slices/authSlice';
import { logout } from '@store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';

interface HeaderProps {
  onMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Menu Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuToggle}
              className="inline-flex lg:hidden items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
            <div className="text-2xl font-bold text-blue-600">VedAI</div>
          </div>

          {/* Right side - User Menu */}
          <div className="flex items-center gap-6">
            {/* Welcome message */}
            {user && (
              <div className="hidden sm:block">
                <p className="text-sm text-gray-600">Welcome back, <span className="font-medium text-gray-900">{user.name || user.email}</span></p>
              </div>
            )}

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <span className="text-sm font-semibold text-blue-600">
                  {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-10">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsProfileOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FiUser className="w-4 h-4" />
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setIsProfileOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <FiSettings className="w-4 h-4" />
                    Settings
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

