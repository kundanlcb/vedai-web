import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBook, FiHelpCircle, FiBarChart2, FiMessageCircle, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { logout } from '@store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { icon: FiHome, label: 'Home', path: '/' },
    { icon: FiBook, label: 'Learning', path: '/learning' },
    { icon: FiHelpCircle, label: 'Question Bank', path: '/questions' },
    { icon: FiBarChart2, label: 'Practice', path: '/practice' },
    { icon: FiMessageCircle, label: 'Chat', path: '/chat' },
  ];

  const bottomMenuItems = [
    { icon: FiUser, label: 'Profile', path: '/profile' },
    { icon: FiSettings, label: 'Settings', path: '/settings' },
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Main Menu Items */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? 'bg-blue-100 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Menu Items */}
      <div className="border-t border-gray-200 px-3 py-4 space-y-2">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? 'bg-blue-100 text-blue-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <FiLogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 pt-20 overflow-y-auto">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={onClose}
          />

          {/* Mobile Menu */}
          <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 z-40 lg:hidden overflow-y-auto">
            {SidebarContent}
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;

