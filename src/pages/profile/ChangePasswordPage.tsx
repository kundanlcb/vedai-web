import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiArrowLeft, FiCheck, FiX, FiShield } from 'react-icons/fi';

const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showRequirements, setShowRequirements] = useState(false);

  const passwordRequirements = [
    { id: 'length', text: 'At least 8 characters', test: (pwd: string) => pwd.length >= 8 },
    { id: 'uppercase', text: 'One uppercase letter', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { id: 'lowercase', text: 'One lowercase letter', test: (pwd: string) => /[a-z]/.test(pwd) },
    { id: 'number', text: 'One number', test: (pwd: string) => /\d/.test(pwd) },
    { id: 'special', text: 'One special character', test: (pwd: string) => /[!@#$%^&*]/.test(pwd) },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    const allRequirementsMet = passwordRequirements.every(req => req.test(formData.newPassword));
    if (!allRequirementsMet) {
      setMessage({ type: 'error', text: 'Password does not meet requirements' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      
      // Clear form and redirect
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }, 1500);
  };

  const getRequirementIcon = (requirement: typeof passwordRequirements[0]) => {
    if (!formData.newPassword) return null;
    const isMet = requirement.test(formData.newPassword);
    return isMet ? (
      <FiCheck className="text-green-600 w-4 h-4" />
    ) : (
      <FiX className="text-red-600 w-4 h-4" />
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/profile')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <FiArrowLeft />
        <span>Back to Profile</span>
      </button>

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Change Password</h1>
        <p className="text-lg text-gray-600">Update your account password for better security</p>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Security Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <FiShield className="text-blue-600 w-5 h-5 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Security Tip</h3>
            <p className="text-sm text-blue-800">
              Use a strong password that you don't use for other websites. Consider using a password manager to keep track of your passwords.
            </p>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Current Password *
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter current password"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              New Password *
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                onFocus={() => setShowRequirements(true)}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new password"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password *
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm new password"
              />
            </div>
            {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
            )}
          </div>
        </div>

        {/* Password Requirements */}
        {showRequirements && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Password Requirements:</h3>
            <div className="space-y-2">
              {passwordRequirements.map((requirement) => (
                <div key={requirement.id} className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    {getRequirementIcon(requirement)}
                  </div>
                  <span className={`text-sm ${
                    !formData.newPassword
                      ? 'text-gray-600'
                      : requirement.test(formData.newPassword)
                      ? 'text-green-700'
                      : 'text-red-700'
                  }`}>
                    {requirement.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Changing Password...' : 'Change Password'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
