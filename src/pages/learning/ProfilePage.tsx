import React from 'react';
import { FiUser } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/slices/authSlice';

const ProfilePage: React.FC = () => {
  const user = useSelector(selectUser);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-lg text-gray-600">Manage your account and learning preferences</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <FiUser className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user?.name || 'Student'}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={user?.name || ''}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

